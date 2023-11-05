import React from "react";
import { useContext, useState } from "react";
import CommentContext from "../context/CommentContext";
import { CreateCommentProps } from "../types";

const CreateComment: React.FC = ({
  buttonText,
  commentId,
  replyId,
}: CreateCommentProps) => {
  const { currentUser, addNewComment, addNewReply } =
    useContext(CommentContext);
  const [text, setText] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (buttonText && buttonText === "REPLY" && !replyId) {
      addNewReply(text, commentId);
    } else if (buttonText && buttonText === "REPLY" && replyId) {
      addNewReply(text, commentId, replyId);
    } else if (!buttonText) {
      addNewComment(text);
    }
    setText("");
  };
  return (
    <div className="comment createComment">
      <img
        src={require(`../assets${currentUser.image.png.slice(1)}`)}
        alt="User"
        className="avatar comment"
      />
      <form className="commentForm" onSubmit={handleSubmit}>
        <textarea
          className="inputComment"
          name="comment"
          placeholder="Add a comment..."
          style={{ height: "4rem", width: "90%" }}
          onChange={(event) => setText(event.target.value)}
          value={text}
        />
        <button className="submit" type="submit">
          {buttonText ? buttonText : "SEND"}
        </button>
      </form>
    </div>
  );
};

export default CreateComment;
