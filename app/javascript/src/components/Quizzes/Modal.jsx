import React from "react";

import { Delete, Warning } from "@bigbinary/neeto-icons";
import { Modal, Typography, Button } from "@bigbinary/neetoui/v2";

const ModalQuiz = ({ showModal, setShowModal, val, deletee }) => {
  return (
    <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="xs">
      <Modal.Header>
        <div className="text-red-500">
          <Warning size={60} />
        </div>
        <Typography style="h2" className="text-red-500">
          Delete Confirmation
        </Typography>
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
          icon={Delete}
          iconPosition="left"
          onClick={() => {
            setShowModal(false);
            deletee(val);
          }}
        />
        <Button
          style="text"
          size="large"
          label="Cancel"
          onClick={() => setShowModal(false)}
        />
      </Modal.Footer>
    </Modal>
  );
};
export default ModalQuiz;
