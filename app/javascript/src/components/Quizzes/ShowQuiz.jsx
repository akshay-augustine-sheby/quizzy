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

import quizzesApi from "../../apis/quizzes";
import PageLoader from "../PageLoader";
import DeleteQuestion from "../Questions/DeleteQuestion";

const ShowQuiz = ({ history }) => {
  const { slug } = useParams();
  const [quiz, setQuiz] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [quizId, setQuizId] = useState("");
  const [published, setPublished] = useState(false);
  const [options, setOptions] = useState({});
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCreateQuestion = () => {
    history.push(`/quizzes/${slug}/question/create`);
  };

  const fetchQuizDetails = async () => {
    try {
      const response = await quizzesApi.show(slug);
      setQuiz(response.data.quiz);
      setQuizId(response.data.quiz.id);
      setPublished(response.data.quiz.published);
      setQuestions(response.data.questions);
      setOptions(response.data.options);
    } catch (error) {
      logger.error(error);
    } finally {
      setPageLoading(false);
    }
  };

  const handlePublish = async () => {
    try {
      await quizzesApi.update({
        slug,
        payload: { quiz: { published: true } },
      });
      const path = `${window.location.origin}/public/${slug}`;
      setUrl(path);
    } catch (error) {
      logger.error(error);
    }
  };

  const editQuestion = question_id => {
    localStorage.setItem("slug", slug);
    history.push(`/questions/${question_id}/edit`);
  };

  useEffect(() => {
    fetchQuizDetails();
  }, []);
  useEffect(() => {
    if (published === true) {
      const path = `${window.location.origin}/public/${slug}`;
      setUrl(path);
    }
  }, [published]);

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
      <div className="flex-col space-y-10 mt-10 mb-10">
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
            {url && (
              <Button
                disabled
                iconPosition="left"
                label="Published"
                size="default"
                style="primary"
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
            {!copied && (
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(url);
                  setCopied(true);
                }}
                size="large"
                style="text"
                icon={Copy}
              />
            )}
            {copied && <div className="text-green-500 italic">URL copied!</div>}
          </div>
        )}
        <div className="flex-row space-y-12">
          {questions?.map((question, index) => (
            <div key={index} className="space-y-3 shadow-lg p-10">
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
                    fetchQuizDetails={fetchQuizDetails}
                    quizId={quizId}
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                {Object.keys(options).map(questionId => {
                  //console.log(questionId)
                  if (parseInt(questionId) === parseInt(question.id)) {
                    //console.log(`questionId: ${questionId}`)
                    //console.log(`question.id: ${question.id}`)
                    //console.log(options[questionId].length)
                    return options[questionId].map((option, index2) => {
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
