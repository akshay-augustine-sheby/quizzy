import React, { useState } from "react";

import QuestionForm from "./QuestionForm";

const QuestionCreate = () => {
  const [question, setQuestion] = useState("");
  const [options1, setOptions1] = useState([{ option: "" }, { option: "" }]);

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

  return (
    <div>
      <QuestionForm
        question={question}
        setQuestion={setQuestion}
        options1={options1}
        handleChange={handleChange}
        handleAdd={handleAdd}
        handleRemove={handleRemove}
      />
    </div>
  );
};

export default QuestionCreate;
