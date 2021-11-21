import React, { useState } from "react";

import { Input } from "@bigbinary/neetoui/v2";

import quizzesApi from "apis/quizzes";
import Button from "components/Button";
import Container from "components/Container";
import PageLoader from "components/PageLoader";

const CreateQuiz = ({ history }) => {
  const [quiz, setQuiz] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      setLoading(true);
      await quizzesApi.create({ quiz: { name: quiz } });
      setLoading(false);
      history.push("/");
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  if (loading) {
    return <PageLoader />;
  }

  return (
    <Container>
      <div className="flex items-center justify-center">
        <form onSubmit={handleSubmit} className="space-y-4 py-40 w-4/5">
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
