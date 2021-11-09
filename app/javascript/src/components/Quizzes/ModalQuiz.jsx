import React from "react";

import { Modal, Typography, Button } from "@bigbinary/neetoui/v2";

const ModalQuiz = ({
  showModalExtraSmall,
  setShowModalExtraSmall,
  val,
  deleteQuiz,
}) => {
  return (
    <Modal
      isOpen={showModalExtraSmall}
      onClose={() => setShowModalExtraSmall(false)}
      size="xs"
    >
      <Modal.Header>
        <Typography style="h2">Delete Confirmation</Typography>
      </Modal.Header>
      <Modal.Body>
        <Typography style="body2" lineHeight="normal">
          Are you sure you want to delete?
        </Typography>
      </Modal.Body>
      <Modal.Footer className="space-x-2">
        <Button
          size="large"
          label="Delete"
          style="danger"
          onClick={() => {
            setShowModalExtraSmall(false);
            deleteQuiz(val);
          }}
        />
        <Button
          style="text"
          size="large"
          label="Cancel"
          onClick={() => setShowModalExtraSmall(false)}
        />
      </Modal.Footer>
    </Modal>
  );
};
export default ModalQuiz;
