import React, { useState } from "react";

import { Delete } from "@bigbinary/neeto-icons";
import { Button } from "@bigbinary/neetoui/v2";

import questionsApi from "../../apis/questions";
import ModalQuiz from "../Quizzes/Modal";

const DeleteQuestion = ({ question_id, fetchQuizDetails, quizId }) => {
  const [showModal, setShowModal] = useState(false);
  const deleteQuestion = async question_id => {
    try {
      await questionsApi.destroy(question_id);
      await fetchQuizDetails(quizId);
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <div>
      <Button
        onClick={() => {
          setShowModal(true);
        }}
        style="danger"
        label="Delete"
        iconPosition="left"
        icon={Delete}
      />
      <ModalQuiz
        showModal={showModal}
        val={question_id}
        setShowModal={setShowModal}
        deletee={deleteQuestion}
      />
    </div>
  );
};
export default DeleteQuestion;
