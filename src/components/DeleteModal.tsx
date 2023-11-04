import CommentContext from "../context/CommentContext";
import { useContext } from "react";

const DeleteModal = () => {
  const { confirmDelete, cancelDelete } = useContext(CommentContext);

  return (
    <>
      <div className="backdrop" onClick={() => cancelDelete()}></div>
      <div className="modal">
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
      </div>
    </>
  );
};

export default DeleteModal;
