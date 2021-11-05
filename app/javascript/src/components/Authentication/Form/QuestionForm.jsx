import React, { useState } from "react";

import { Input, Select } from "@bigbinary/neetoui/v2";

import Button from "components/Button";
import Container from "components/Container";

const QuestionForm = () => {
  const [question, setQuestion] = useState("");
  const [option, setOption] = useState({ option1: "", option2: "" });

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
          <Input
            label="Option 1"
            placeholder=""
            size="small"
            type="text"
            onChange={e => setOption({ ...option, option1: e.target.value })}
          />
          <Input
            label="Option 2"
            placeholder=""
            size="small"
            type="text"
            onChange={e => setOption({ ...option, option2: e.target.value })}
          />
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
              options={[
                {
                  label: option.option1,
                  value: option.option1,
                },
                {
                  label: option.option2,
                  value: option.option2,
                },
              ]}
              placeholder="Select an Option"
            />
          </div>
          <Button type="submit" buttonText="Submit" />
        </form>
      </div>
    </Container>
  );
};
export default QuestionForm;
