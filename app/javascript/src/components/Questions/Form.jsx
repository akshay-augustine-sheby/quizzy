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
  options,
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
            label="Question*"
            placeholder=""
            size="small"
            type="text"
            className="w-3/5"
            value={question}
            onChange={e => setQuestion(e.target.value)}
          />
          {options.map((opt, id) => {
            if (id <= 1) {
              return (
                <div key={`${opt}-${id}`}>
                  <Input
                    label={`Option ${id + 1}*`}
                    placeholder=""
                    size="small"
                    type="text"
                    className="w-3/5"
                    value={options[id].option}
                    onChange={e => handleChange(id, e)}
                  />
                </div>
              );
            }

            return (
              <div
                className="flex flex-row w-3/5 space-x-2 place-items-end align-bottom justify-end"
                key={`${opt}-${id}`}
              >
                <Input
                  label={`Option ${id + 1}`}
                  placeholder=""
                  size="small"
                  type="text"
                  className="w-3/5"
                  value={options[id].option}
                  onChange={e => handleChange(id, e)}
                />
                <div className="h-full">
                  <Button
                    onClick={() => handleRemove(id)}
                    style="danger"
                    size="large"
                    icon={CloseCircle}
                  />
                </div>
              </div>
            );
          })}

          {options.length <= 3 && (
            <Button
              label="+ Add option"
              onClick={() => handleAdd()}
              style="link"
            />
          )}

          <div className="">
            <Select
              isCreatable
              label="Correct answer*"
              value={answer}
              name="ValueList"
              className="w-3/5"
              options={options.map(opt => {
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
