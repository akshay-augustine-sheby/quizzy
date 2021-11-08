import React, { useEffect, useState } from "react";

import { Plus } from "@bigbinary/neeto-icons";
import { Button } from "@bigbinary/neetoui/v2";
import { isNil, isEmpty, either } from "ramda";

import quizzesApi from "apis/quizzes";
import Container from "components/Container";

import PageLoader from "../PageLoader";
import Table from "../Table";

const Dashboard = ({ history }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchQuizzes = async () => {
    try {
      const response = await quizzesApi.list();
      setQuizzes(response.data.quizzes);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateQuiz = () => {
    window.location.href = "/quizcreate";
  };

  const deleteQuiz = async slug => {
    try {
      await quizzesApi.destroy(slug);
      await fetchQuizzes();
      window.location.href = "/";
    } catch (error) {
      logger.error(error);
    }
  };

  const editQuiz = slug => {
    //window.location.href = `/quiz/${slug}/edit`;
    history.push(`/quiz/${slug}/edit`);
  };

  const showQuiz = slug => {
    history.push(`/quiz/${slug}/show`);
    logger.log(slug);
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  if (loading) {
    return (
      <div className="w-screen h-screen">
        <PageLoader />
      </div>
    );
  } else if (either(isNil, isEmpty)(quizzes)) {
    return (
      <Container>
        <div className="flex-col space-y-40 mt-10">
          <div className="flex justify-between">
            <div></div>
            <Button
              iconPosition="left"
              label="Add new quiz"
              size="default"
              style="primary"
              onClick={handleCreateQuiz}
              icon={Plus}
            />
          </div>
          <div className="text-xl text-center">
            You have not created any quiz.
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="flex-col space-y-5 mt-10">
        <div className="flex justify-between">
          <div className="text-3xl font-bold ">List of quizzes</div>
          <Button
            iconPosition="left"
            label="Add new quiz"
            size="default"
            style="primary"
            onClick={handleCreateQuiz}
            icon={Plus}
          />
        </div>
        <div className="">
          <Table
            quizzes={quizzes}
            deleteQuiz={deleteQuiz}
            editQuiz={editQuiz}
            showQuiz={showQuiz}
          />
        </div>
      </div>
    </Container>
  );
};
export default Dashboard;
