import React from "react";

import { CloseCircle } from "@bigbinary/neeto-icons";
import { Input, Select, Button } from "@bigbinary/neetoui/v2";

import Button2 from "components/Button";
import Container from "components/Container";

const FormQuestion = ({
  type,
  quiz,
  question,
  setQuestion,
  answer,
  setAnswer,
  options1,
  handleChange,
  handleAdd,
  handleRemove,
  handleSubmit,
  loading,
}) => {
  return (
    <Container>
      <div className="flex-col space-y-20 mt-10">
        <div className="text-3xl font-bold">
          {quiz === "Edit Question" ? quiz : quiz.name}
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            label="Question"
            placeholder=""
            size="small"
            type="text"
            className="w-3/5"
            value={question}
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
                    className="w-3/5"
                    value={options1[id].option}
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
                  className="w-3/5"
                  value={options1[id].option}
                  onChange={e => handleChange(id, e)}
                />
                <Button
                  label="Remove"
                  onClick={() => handleRemove(id)}
                  style="danger"
                  className="h-1"
                  icon={CloseCircle}
                  iconPosition="left"
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
                label: answer,
                value: answer,
              }}
              isCreatable
              label="Correct answer"
              name="ValueList"
              options={options1.map(opt => {
                //console.log(opt)
                return {
                  label: opt.option,
                  value: opt.option,
                };
              })}
              placeholder="Select an Option"
              onChange={val => setAnswer(val)}
            />
          </div>
          <Button2
            type="submit"
            buttonText={type === "update" ? "Update" : "Submit"}
            loading={loading}
          />
        </form>
      </div>
    </Container>
  );
};
export default FormQuestion;
