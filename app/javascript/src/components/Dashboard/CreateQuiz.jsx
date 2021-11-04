import React, { useEffect, useState } from "react";

import { Input } from "@bigbinary/neetoui/v2";

import quizzesApi from "apis/quizzes";
import usersApi from "apis/users";
import Button from "components/Button";
import Container from "components/Container";
import PageLoader from "components/PageLoader";

const CreateQuiz = ({ history }) => {
  const [quiz, setQuiz] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  //const [users,setUsers] = useState([])
  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await quizzesApi.create({ quiz: { quiz_name: quiz, user_id: userId } });
      setLoading(false);
      history.push("/");
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  const fetchUserDetails = async () => {
    try {
      const response = await usersApi.list();
      //setUsers(response.data.users);
      setUserId(response.data.users[0].id);
      setPageLoading(false);
    } catch (error) {
      logger.error(error);
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  if (pageLoading) {
    return <PageLoader />;
  }

  return (
    <Container>
      <div className="flex items-center justify-center">
        <form onSubmit={handleSubmit} className="space-y-4 py-40">
          <div className="text-2xl font-bold">Add New Quiz</div>
          <Input
            label="Quiz Name"
            placeholder=""
            value={quiz}
            size="small"
            type="text"
            onChange={e => setQuiz(e.target.value)}
          />
          <Button type="submit" buttonText="Submit" loading={loading} />
        </form>
      </div>
    </Container>
  );
};
export default CreateQuiz;
