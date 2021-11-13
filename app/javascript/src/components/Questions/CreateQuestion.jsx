import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import FormQuestion from "./Form";

import questionsApi from "../../apis/questions";
import quizzesApi from "../../apis/quizzes";
import PageLoader from "../PageLoader";

const QuestionCreate = ({ history }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [options, setOptions] = useState([{ option: "" }, { option: "" }]);

  const { slug } = useParams();
  const [quiz, setQuiz] = useState([]);
  const [quizId, setQuizId] = useState("");
  //const [questionId, setQuestionId] = useState("");
  const [pageLoading, setPageLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleChange = (id, e) => {
    const values = [...options];
    values[id].option = e.target.value;
    setOptions(values);
  };

  const handleAdd = () => {
    const values = [...options];
    values.push({ option: "" });
    setOptions(values);
  };

  const handleRemove = id => {
    const values = [...options];
    values.splice(id, 1);
    setOptions(values);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await questionsApi.create({
        question: {
          name: question,
          answer: answer.value,
          quiz_id: quizId,
          options_attributes: options.map(opt => {
            return {
              name: opt.option,
            };
          }),
        },
      });
      setLoading(false);
      history.push(`/quiz/${slug}/show`);
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

  useEffect(() => {
    setAnswer("");
  }, [options]);

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
      <FormQuestion
        quiz={quiz}
        setQuestion={setQuestion}
        answer={answer}
        setAnswer={setAnswer}
        options={options}
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
