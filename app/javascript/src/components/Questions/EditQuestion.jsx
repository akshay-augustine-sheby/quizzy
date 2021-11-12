import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import FormQuestion from "./FormQuestion";

import optionsApi from "../../apis/options";
import questionsApi from "../../apis/questions";
import PageLoader from "../PageLoader";

const EditQuestion = ({ history }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [options1, setOptions1] = useState([{ option: "" }, { option: "" }]);
  const [optionsId, setOptionsId] = useState([]);
  const { question_id } = useParams();
  const [loading, setLoading] = useState(false);

  const handleChange = (id, e) => {
    const values = [...options1];
    values[id].option = e.target.value;
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

  const fetchOptions = async question_id => {
    try {
      const response = await optionsApi.show(question_id);
      //console.log(response)
      setOptionsId(response.data.optionsId);
      setQuestion(response.data.question[0].name);
      setOptions1(
        response.data.optionsName.map(name => {
          return {
            option: name,
          };
        })
      );
      setAnswer(response.data.question[0].answer);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
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
            options_attributes: options1.map((it, index) => {
              if (optionsId[index] != undefined) {
                return {
                  id: optionsId[index],
                  name: it.option,
                  question_id: question_id,
                };
              }

              return {
                name: it.option,
                question_id: question_id,
              };
            }),
          },
        },
      });
      setLoading(false);
      const slug = localStorage.getItem("slug");
      history.push(`/quiz/${slug}/show`);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOptions(question_id);
  }, []);
  useEffect(() => {
    setAnswer("");
    //console.log(options1)
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
        quiz="Edit Question"
        question={question}
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
