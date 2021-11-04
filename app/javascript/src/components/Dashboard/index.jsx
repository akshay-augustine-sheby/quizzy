import React, { useState } from "react";

import { Plus } from "@bigbinary/neeto-icons";
import { Button } from "@bigbinary/neetoui/v2";
import { isNil, isEmpty, either } from "ramda";

import Container from "components/Container";

const Dashboard = () => {
  const [quiz, setQuiz] = useState([]);
  setQuiz([]);
  if (either(isNil, isEmpty)(quiz)) {
    return (
      <Container>
        <div className="flex-col space-y-20">
          <div className="my-6">
            <Button
              iconPosition="left"
              label="Add new quiz"
              size="default"
              style="primary"
              onClick={() => {}}
              icon={Plus}
            />
          </div>
          <h1 className="my-6 text-xl leading-5 text-center">
            You have not created any quiz.
          </h1>
        </div>
      </Container>
    );
  }

  return <div></div>;
};
export default Dashboard;
