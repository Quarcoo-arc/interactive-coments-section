import CommentContext from "../context/CommentContext";
import React, { useContext, useState, useEffect } from "react";
import Modal from "./Modal";

const DeleteModal: React.FC = () => {
  const { confirmDelete, cancelDelete, showDeleteModal } =
    useContext(CommentContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
    cancelDelete();
  };

  useEffect(() => {
    setIsOpen(showDeleteModal);
  }, [showDeleteModal]);

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <h1>Delete Comment</h1>
      <p>
        Are you sure you want to delete this comment? This will remove the
        comment and can't be undone.
      </p>
      <div className="flex">
        <div className="submit button cancel" onClick={() => cancelDelete()}>
          NO, CANCEL
        </div>
        <div className="submit button delete" onClick={() => confirmDelete()}>
          YES, DELETE
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
