import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import FormQuestion from "./FormQuestion";

import questionsApi from "../../apis/questions";
import PageLoader from "../PageLoader";

const EditQuestion = ({ history }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [options1, setOptions1] = useState([{ option: "" }, { option: "" }]);

  const { question_id } = useParams();
  //const [quiz, setQuiz] = useState([]);
  //const [questionId, setQuestionId] = useState("");
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
      await questionsApi.update({
        question_id,
        payload: {
          question: {
            name: question,
            answer: answer.value,
            options_attributes: options1.map(it => {
              return {
                name: it.value,
              };
            }),
          },
        },
      });
      setLoading(false);
      history.push("/");
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setAnswer("");
  }, [options1]);

  //console.log(quiz)
  //console.log(question)
  //console.log(answer.value)

  if (loading) {
    return (
      <div className="w-screen h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div>
      <FormQuestion
        type="update"
        //quiz={quiz}
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

export default EditQuestion;
