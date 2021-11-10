import React, { useEffect, useState } from "react";

import { Plus } from "@bigbinary/neeto-icons";
import { Button } from "@bigbinary/neetoui/v2";
import { isNil, isEmpty, either } from "ramda";
import { useParams } from "react-router-dom";

import Container from "components/Container";

import optionsApi from "../../apis/options";
import questionsApi from "../../apis/questions";
import quizzesApi from "../../apis/quizzes";
import PageLoader from "../PageLoader";

const ShowQuiz = ({ history }) => {
  const { slug } = useParams();
  const [quiz, setQuiz] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [quizId, setQuizId] = useState("");
  const questionId = [];

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

  const fetchQuestionDetails = async () => {
    try {
      //console.log(quizId)
      const response = await questionsApi.show(quizId);
      setQuestions(response.data.questions);
    } catch (error) {
      logger.error(error);
    } finally {
      setPageLoading(false);
    }
  };

  const fetchOptions = async id => {
    try {
      //console.log(id)
      //const response =
      await optionsApi.show(id);
      //console.log(response)
    } catch (error) {
      logger.error(error);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizDetails();
  }, []);

  useEffect(() => {
    fetchQuestionDetails();
  }, [quizId]);

  useEffect(() => {
    questions.map(question => {
      questionId.push(question.id);
    });
    questionId.map(id => {
      fetchOptions(id);
    });
    //console.log(questionId)
    //console.log(questions)
  }, [questions]);

  if (pageLoading) {
    return (
      <div className="w-screen h-screen">
        <PageLoader />
      </div>
    );
  } else if (either(isNil, isEmpty)(questions)) {
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
        <div className="flex-row space-y-10">
          {questions.map((question, index) => (
            <div key={index}>
              <div className="flex space-x-10 ">
                <div>{`Question ${index + 1}`}</div>
                <div>{question["name"]}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};
export default ShowQuiz;
