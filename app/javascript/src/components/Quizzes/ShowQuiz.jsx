import React, { useEffect, useState } from "react";

import {
  Plus,
  Edit,
  Checkmark,
  ExternalLink,
  Copy,
} from "@bigbinary/neeto-icons";
import { Button } from "@bigbinary/neetoui/v2";
import { isNil, isEmpty, either } from "ramda";
import { useParams } from "react-router-dom";

import Container from "components/Container";

import questionsApi from "../../apis/questions";
import quizzesApi from "../../apis/quizzes";
import PageLoader from "../PageLoader";
import DeleteQuestion from "../Questions/DeleteQuestion";

const ShowQuiz = ({ history }) => {
  const { slug } = useParams();
  const [quiz, setQuiz] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [quizId, setQuizId] = useState("");
  const [options, setOptions] = useState({});
  const [url, setUrl] = useState("");

  const handleCreateQuestion = () => {
    history.push(`/quiz/${slug}/question/create`);
  };
  const fetchQuizDetails = async () => {
    try {
      const response = await quizzesApi.show(slug);
      setQuiz(response.data.quiz);
      setQuizId(response.data.quiz.id);
    } catch (error) {
      logger.error(error);
    } finally {
      setPageLoading(false);
    }
  };

  const handlePublish = () => {
    //console.log(window.location.origin)
    const path = `${window.location.origin}/public/${slug}`;
    setUrl(path);
    //console.log(url)
  };

  const fetchQuestionDetails = async quizId => {
    try {
      //console.log(quizId)
      const response = await questionsApi.show(quizId);
      //console.log(response)
      setQuestions(response.data.questions);
      setOptions(response.data.options);
    } catch (error) {
      logger.error(error);
    } finally {
      setPageLoading(false);
    }
  };

  const editQuestion = question_id => {
    localStorage.setItem("slug", slug);
    history.push(`/question/${question_id}/edit`);
  };

  useEffect(() => {
    fetchQuizDetails();
  }, []);

  useEffect(() => {
    fetchQuestionDetails(quizId);
  }, [quizId]);

  if (pageLoading) {
    return (
      <div className="w-screen h-screen">
        <PageLoader />
      </div>
    );
  } else if (either(isNil, isEmpty)(questions, options)) {
    return (
      <Container>
        <div className="flex-col space-y-40 mt-10">
          <div className="flex justify-between">
            <div className="text-3xl font-bold">{quiz.name}</div>
            <Button
              iconPosition="left"
              label="Add questions"
              size="default"
              style="primary"
              onClick={handleCreateQuestion}
              icon={Plus}
            />
          </div>
          <div className="text-xl text-center">
            There are no questions in this quiz.
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="flex-col space-y-20 mt-10">
        <div className="flex justify-between">
          <div className="text-3xl font-bold">{quiz.name}</div>
          <div className="flex space-x-2">
            <Button
              iconPosition="left"
              label="Add questions"
              size="default"
              style="primary"
              onClick={handleCreateQuestion}
              icon={Plus}
            />
            {!url && (
              <Button
                iconPosition="left"
                label="Publish"
                size="default"
                style="primary"
                onClick={handlePublish}
                icon={ExternalLink}
              />
            )}
          </div>
        </div>
        {url && (
          <div className="flex flex-row space-x-2 items-center">
            <div className="text-green-500">
              <Checkmark size={24} />
            </div>
            <div className="font-semibold text-base">
              Published, your public link is -
            </div>
            <Button label={url} style="link" />
            <Button
              onClick={() => navigator.clipboard.writeText(url)}
              size="large"
              style="text"
              icon={Copy}
            />
          </div>
        )}
        <div className="flex-row space-y-12">
          {questions?.map((question, index) => (
            <div key={index} className="space-y-3">
              <div className="flex space-x-10 ">
                <div className="text-gray-600">{`Question ${index + 1}`}</div>
                <div className="font-extrabold">{question.name}</div>
                <div className="flex space-x-6">
                  <Button
                    onClick={() => editQuestion(question.id)}
                    style="secondary"
                    label="Edit"
                    iconPosition="left"
                    icon={Edit}
                  />
                  <DeleteQuestion
                    question_id={question.id}
                    fetchQuestionDetails={fetchQuestionDetails}
                    quizId={quizId}
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                {Object.keys(options).map(it => {
                  //console.log(it)
                  if (parseInt(it) === parseInt(question.id)) {
                    //console.log(`it: ${it}`)
                    //console.log(`question.id: ${question.id}`)
                    //console.log(options[it].length)
                    return options[it].map((option, index2) => {
                      if (option === question.answer) {
                        return (
                          <div key={index2} className="flex space-x-10">
                            <div className="text-gray-600">{`Option ${
                              index2 + 1
                            }`}</div>
                            <div className="flex space-x-5">
                              <div className="font-medium">{option}</div>
                              <div className="flex space-x-2 text-green-500 font-medium">
                                <Checkmark size={18} />
                                <div>Correct answer</div>
                              </div>
                            </div>
                          </div>
                        );
                      }

                      return (
                        <div key={index2} className="flex space-x-10">
                          <div className="text-gray-600">{`Option ${
                            index2 + 1
                          }`}</div>
                          <div className="font-medium">{option}</div>
                        </div>
                      );
                    });
                  }

                  return false;
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};
export default ShowQuiz;
