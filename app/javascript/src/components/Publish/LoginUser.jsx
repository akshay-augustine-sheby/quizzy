import React, { useEffect, useState } from "react";

import { Input } from "@bigbinary/neetoui/v2";
import { useParams } from "react-router-dom";

import Button from "components/Button";

import quizzesApi from "../../apis/quizzes";
import usersApi from "../../apis/users";

const LoginUser = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [quizName, setQuizName] = useState("");
  const [loading, setLoading] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    fetchQuiz(slug);
  }, []);

  const fetchQuiz = async slug => {
    try {
      const response = await quizzesApi.show(slug);
      setQuizName(response.data.quiz.name);
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
      await usersApi.create({
        user: { first_name: firstName, last_name: lastName, email },
      });
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="text-5xl font-bold border-b-2 px-12">Quizzy</div>
      <div className="flex items-center justify-center">
        <form onSubmit={handleSubmit} className="space-y-4 py-40 w-1/4">
          <div className="text-2xl font-bold">Welcome to {quizName}</div>
          <Input
            label="First Name"
            placeholder=""
            size="small"
            type="text"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
          <Input
            label="Last Name"
            placeholder=""
            size="small"
            type="text"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
          <Input
            label="Email"
            placeholder=""
            size="small"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Button type="submit" buttonText="Next" loading={loading} />
        </form>
      </div>
    </div>
  );
};
export default LoginUser;
