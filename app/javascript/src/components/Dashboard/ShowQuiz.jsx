import React, { useEffect, useState } from "react";

import { Plus } from "@bigbinary/neeto-icons";
import { Button } from "@bigbinary/neetoui/v2";
import { isNil, isEmpty, either } from "ramda";
import { useParams } from "react-router-dom";

import Container from "components/Container";

import quizzesApi from "../../apis/quizzes";
import PageLoader from "../PageLoader";

const ShowQuiz = ({ history }) => {
  const { slug } = useParams();
  const question = [];
  const [quiz, setQuiz] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);

  const handleCreateQuestion = () => {
    history.push(`/quiz/${slug}/question/create`);
  };
  const fetchQuizDetails = async () => {
    try {
      const response = await quizzesApi.show(slug);
      setQuiz(response.data.quiz);
    } catch (error) {
      logger.error(error);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizDetails();
  }, []);

  if (pageLoading) {
    return (
      <div className="w-screen h-screen">
        <PageLoader />
      </div>
    );
  } else if (either(isNil, isEmpty)(question)) {
    return (
      <Container>
        <div className="flex-col space-y-40 mt-10">
          <div className="flex justify-between">
            <div className="text-3xl font-bold">{quiz.quiz_name}</div>
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

  return false;
};
export default ShowQuiz;
