import React, { useEffect, useState } from "react";

import { Input } from "@bigbinary/neetoui/v2";
import { useParams } from "react-router-dom";

import quizzesApi from "apis/quizzes";
import Button from "components/Button";
import Container from "components/Container";
import PageLoader from "components/PageLoader";

import Toastr from "../Common/Toastr";

const EditQuiz = ({ history }) => {
  const [quiz, setQuiz] = useState("");
  const [loading, setLoading] = useState(false);
  const { slug } = useParams();

  const fetchQuizName = async () => {
    try {
      setLoading(true);
      const response = await quizzesApi.show(slug);
      setQuiz(response.data.quiz.name);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      setLoading(true);
      await quizzesApi.update({
        slug,
        payload: { quiz: { name: quiz } },
      });
      setLoading(false);
      Toastr.success("Quiz successfully updated");
      history.push("/");
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchQuizName();
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <Container>
      <div className="flex items-center justify-center">
        <form onSubmit={handleSubmit} className="space-y-4 py-40 w-4/5">
          <div className="text-2xl font-bold">Edit Quiz</div>
          <Input
            label="Quiz Name"
            placeholder="Enter the new quiz name"
            value={quiz}
            size="small"
            type="text"
            onChange={e => setQuiz(e.target.value)}
          />
          <Button type="submit" buttonText="Update" loading={loading} />
        </form>
      </div>
    </Container>
  );
};
export default EditQuiz;
