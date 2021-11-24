import React, { useEffect, useState } from "react";

import { Checkmark } from "@bigbinary/neeto-icons";

import attemptsApi from "../../apis/attempts";
import questionsApi from "../../apis/questions";
import PublicNavBar from "../NavBar/PublicNavBar";
import PageLoader from "../PageLoader";

const Result = ({ quizName, options, userAnswers, quizId, attempt_id }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const fetchAnswers = async () => {
    try {
      const response = await questionsApi.show(quizId);
      setQuestions(response.data.questions);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  const fetchCount = () => {
    let flagA = 0;
    let count = 0;
    questions.map(question => {
      if (userAnswers[question.id] === question.answer) {
        flagA = 1;
        count = count + 1;
      }
    });
    if (flagA === 0) {
      setIncorrect(questions.length);
    } else {
      setCorrect(count);
    }
  };

  const updateAnswers = async () => {
    try {
      await attemptsApi.update({
        attempt_id,
        payload: {
          attempt: {
            correct_answers_count: correct,
            incorrect_answers_count: questions.length - correct,
          },
        },
      });
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchAnswers();
  }, []);
  useEffect(() => {
    fetchCount();
  }, [questions]);

  useEffect(() => {
    updateAnswers();
  }, [correct, incorrect]);

  if (loading) {
    return (
      <div className="w-screen h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div>
      <PublicNavBar />
      <div className="flex flex-col justify-center items-center space-y-5 mt-10 mb-10 px-20">
        <div>
          <div className="text-3xl font-bold">{quizName}</div>
        </div>
        <div className="flex flex-col space-y-1 mb-10">
          <div className="text-xl text-center">
            Thank you for taking the quiz, here are your results.
          </div>
          <div className="text-xl text-center">
            You have submitted {correct} correct and{" "}
            {questions.length - correct} incorrect answers.
          </div>
        </div>
        <div className="flex-row space-y-12">
          {questions?.map((question, index) => (
            <div key={index} className="space-y-3">
              <div className="flex space-x-10 ">
                <div className="text-gray-600">{`Question ${index + 1}`}</div>
                <div className="flex flex-col space-y-3">
                  <div className="font-extrabold">{question.name}</div>
                  <div className="flex flex-col space-y-2">
                    {Object.keys(options).map(questionId => {
                      if (parseInt(questionId) === parseInt(question.id)) {
                        return options[questionId].map((option, index2) => {
                          if (option === question.answer) {
                            return (
                              <div
                                key={index2}
                                className="flex flex-col justify-start items-start space-x-10"
                              >
                                <div className="flex space-x-5">
                                  <div>
                                    <label>
                                      <input
                                        type="radio"
                                        name={questionId}
                                        value={option}
                                        checked={
                                          userAnswers[questionId] === option
                                        }
                                        disabled
                                      />
                                      {`  ${option}`}
                                    </label>
                                  </div>
                                  <div className="flex space-x-2 text-green-500 font-medium">
                                    <Checkmark size={18} />
                                    <div>Correct answer</div>
                                  </div>
                                </div>
                              </div>
                            );
                          }

                          return (
                            <div
                              key={index2}
                              className="flex flex-col justify-start items-start space-x-10"
                            >
                              <label>
                                <input
                                  type="radio"
                                  name={questionId}
                                  value={option}
                                  checked={userAnswers[questionId] === option}
                                />
                                {`  ${option}`}
                              </label>
                            </div>
                          );
                        });
                      }

                      return false;
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Result;
