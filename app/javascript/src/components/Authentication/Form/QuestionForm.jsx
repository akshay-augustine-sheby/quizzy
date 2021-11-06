import React, { useState } from "react";

import { Input, Select, Button } from "@bigbinary/neetoui/v2";

import Button2 from "components/Button";
import Container from "components/Container";

const QuestionForm = () => {
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
    <Container>
      <div className="flex-col space-y-40 mt-10">
        <div className="text-3xl font-bold">Quiz Name {question}</div>
        <form>
          <Input
            label="Question"
            placeholder=""
            size="small"
            type="text"
            onChange={e => setQuestion(e.target.value)}
          />
          {options1.map((opt, id) => {
            if (id <= 1) {
              return (
                <div key={`${opt}-${id}`}>
                  <Input
                    label={`Option ${id + 1}`}
                    placeholder=""
                    size="small"
                    type="text"
                    onChange={e => handleChange(id, e)}
                  />
                </div>
              );
            }

            return (
              <div key={`${opt}-${id}`}>
                <Input
                  label={`Option ${id + 1}`}
                  placeholder=""
                  size="small"
                  type="text"
                  onChange={e => handleChange(id, e)}
                />
                <Button
                  label="Remove"
                  onClick={() => handleRemove(id)}
                  style="secondary"
                />
              </div>
            );
          })}

          {options1.length <= 3 && (
            <Button
              label="+ Add option"
              onClick={() => handleAdd()}
              style="link"
            />
          )}

          <div className="p-4 mb-2">
            <Select
              defaultValue={{
                label: "Select an option",
                value: "",
              }}
              isClearable
              isSearchable
              label="Correct answer"
              name="ValueList"
              options={options1.map(opt => {
                //console.log(opt)
                return {
                  label: opt.value,
                  value: opt.value,
                };
              })}
              placeholder="Select an Option"
            />
          </div>
          <Button2 type="submit" buttonText="Submit" />
        </form>
      </div>
    </Container>
  );
};
export default QuestionForm;
