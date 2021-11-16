import React, { useEffect } from "react";

import PublicNavBar from "../NavBar/PublicNavBar";

const Result = ({ quizName }) => {
  const fetchAnswers = () => {};

  useEffect(() => {
    fetchAnswers();
  }, []);
  return (
    <div>
      <PublicNavBar />
      <div className="flex flex-col justify-center items-center space-y-40 mt-10">
        <div>
          <div className="text-3xl font-bold">{quizName}</div>
        </div>
        <div className="text-xl text-center">
          Thank you for taking the quiz.
        </div>
      </div>
    </div>
  );
};
export default Result;
