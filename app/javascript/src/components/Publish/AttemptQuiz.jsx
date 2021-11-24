import React, { useEffect, useState } from "react";

import { isNil, isEmpty, either } from "ramda";

import Button from "components/Button";

import Result from "./Result";

import attemptsApi from "../../apis/attempts";
import publicQuizzesApi from "../../apis/publicQuizzes";
import Toastr from "../Common/Toastr";
import PublicNavBar from "../NavBar/PublicNavBar";
import PageLoader from "../PageLoader";

const AttemptQuiz = ({ attemptId, slug }) => {
  const [loading, setLoading] = useState(false);
  const [quizName, setQuizName] = useState("");
  const [quizId, setQuizId] = useState("");
  const [questionIds, setQuestionIds] = useState([]);
  const [options, setOptions] = useState({});
  const [questions, setQuestions] = useState([]);
  const [attempt_id, setAttempt_id] = useState("");
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const fetchQuiz = async slug => {
    try {
      const response = await publicQuizzesApi.show(slug);
      setQuizName(response.data.quiz.name);
      setQuizId(response.data.quiz.id);
      setQuestionIds(response.data.id);
      setQuestions(response.data.name);
      setOptions(response.data.options);
      setLoading(false);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setAttempt_id(attemptId);
    fetchQuiz(slug);
  }, []);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      setLoading(true);
      await attemptsApi.update({
        attempt_id,
        payload: {
          attempt: {
            submitted: true,
            attempt_answers_attributes: questionIds.map(question_id => {
              return {
                question_id: question_id,
                answer: userAnswers[question_id],
              };
            }),
          },
        },
      });
      setLoading(false);
      Toastr.success("Quiz submitted successfully ");
      setSubmitted(true);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  if (!submitted) {
    if (loading) {
      return (
        <div className="w-screen h-screen">
          <PageLoader />
        </div>
      );
    } else if (either(isNil, isEmpty)(questions)) {
      return (
        <div>
          <PublicNavBar />
          <div className="flex flex-col justify-center items-center space-y-40 mt-10">
            <div>
              <div className="text-3xl font-bold">{quizName}</div>
            </div>
            <div className="text-xl text-center">
              There are no questions created.
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        <PublicNavBar />
        <div className="flex flex-col justify-center items-center space-y-20 mt-10 mb-10 px-20">
          <form onSubmit={handleSubmit}>
            <div className="mb-10">
              <div className="text-3xl font-bold">{quizName}</div>
            </div>
            <div className="flex-row space-y-12">
              {questions?.map((question, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex space-x-10 ">
                    <div className="text-gray-600">{`Question ${
                      index + 1
                    }`}</div>
                    <div className="flex flex-col space-y-3">
                      <div className="font-extrabold">{question}</div>
                      <div className="flex flex-col space-y-2">
                        {Object.keys(options).map(questionId => {
                          if (
                            parseInt(questionId) ===
                            parseInt(questionIds[index])
                          ) {
                            return options[questionId].map((option, index2) => {
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
                                      checked={
                                        userAnswers[questionId] === option
                                      }
                                      onChange={e =>
                                        setUserAnswers({
                                          ...userAnswers,
                                          [questionId]: e.target.value,
                                        })
                                      }
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
            <Button type="submit" buttonText="Submit" loading={loading} />
          </form>
        </div>
      </div>
    );
  }

  return (
    <Result
      quizName={quizName}
      options={options}
      userAnswers={userAnswers}
      quizId={quizId}
      attempt_id={attempt_id}
    />
  );
};
export default AttemptQuiz;
