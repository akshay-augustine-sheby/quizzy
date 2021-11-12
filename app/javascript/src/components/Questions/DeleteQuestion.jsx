import React from "react";

import { Delete } from "@bigbinary/neeto-icons";
import { Button } from "@bigbinary/neetoui/v2";

import questionsApi from "../../apis/questions";

const DeleteQuestion = ({ question_id, fetchQuestionDetails, quizId }) => {
  const deleteQuestion = async question_id => {
    try {
      await questionsApi.destroy(question_id);
      await fetchQuestionDetails(quizId);
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <div>
      <Button
        onClick={() => deleteQuestion(question_id)}
        style="danger"
        label="Delete"
        iconPosition="left"
        icon={Delete}
      />
    </div>
  );
};
export default DeleteQuestion;
