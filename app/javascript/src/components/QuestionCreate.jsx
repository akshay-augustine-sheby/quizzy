import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import PageLoader from "./PageLoader";
import QuestionForm from "./QuestionForm";

import optionsApi from "../apis/options";
import questionsApi from "../apis/questions";
import quizzesApi from "../apis/quizzes";

const QuestionCreate = ({ history }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [options1, setOptions1] = useState([{ option: "" }, { option: "" }]);

  const { slug } = useParams();
  const [quiz, setQuiz] = useState([]);
  const [quizId, setQuizId] = useState("");
  //const [questionId, setQuestionId] = useState("");
  const [pageLoading, setPageLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleChange = (id, e) => {
    const values = [...options1];
    values[id].value = e.target.value;
    setOptions1(values);
  };

  const handleAdd = () => {
    const values = [...options1];
    values.push({ option: "" });
    setOptions1(values);
  };

  const handleRemove = id => {
    const values = [...options1];
    values.splice(id, 1);
    setOptions1(values);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const response = await questionsApi.create({
        question: { question: question, answer: answer.value, quiz_id: quizId },
      });
      //setQuestionId(response.data.dat.id)
      //console.log(response)
      //console.log(response.data.dat.id)
      //console.log(questionId)
      options1.map(async it => {
        await optionsApi.create({
          option: { option: it.value, question_id: response.data.dat.id },
        });
        //console.log(it.value)
      });

      setLoading(false);
      history.push(`/quiz/${slug}/show`);
      //console.log(response.data.dat.id)
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  const fetchQuizDetails = async () => {
    try {
      //console.log(slug)
      const response = await quizzesApi.show(slug);
      setQuiz(response.data.quiz);
      setQuizId(response.data.quiz.id);
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

  //console.log(quiz)
  //console.log(question)
  //console.log(answer.value)

  if (pageLoading) {
    return (
      <div className="w-screen h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div>
      <QuestionForm
        quiz={quiz}
        setQuestion={setQuestion}
        answer={answer}
        setAnswer={setAnswer}
        options1={options1}
        handleChange={handleChange}
        handleAdd={handleAdd}
        handleRemove={handleRemove}
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
};

export default QuestionCreate;
