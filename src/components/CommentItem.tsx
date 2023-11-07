import React from "react";
import { ReactComponent as ReplyIcon } from "../assets/images/icon-reply.svg";
import { ReactComponent as DeleteIcon } from "../assets/images/icon-delete.svg";
import { ReactComponent as EditIcon } from "../assets/images/icon-edit.svg";
import plusIcon from "../assets/images/icon-plus.svg";
import minusIcon from "../assets/images/icon-minus.svg";
import CommentReply from "./CommentReply";
import { useState, useContext, useEffect, useRef } from "react";
import CommentContext from "../context/CommentContext";
import CreateComment from "./CreateComment";
import DeleteModal from "./DeleteModal";
import { timeDifference } from "../helpers";
import {
  CommentType,
  ReplyType,
  UserType,
  UpdateCommentOrReplyArgsType,
  DeleteCommentOrReplyFuncType,
  ChangeScoreFuncType,
} from "../types";

const CommentItem = ({ comment }: { comment: CommentType }) => {
  const {
    currentUser,
    changeScore,
    deleteComment,
    showDeleteModal,
    updateComment,
  }: {
    currentUser: UserType;
    changeScore: ChangeScoreFuncType;
    deleteComment: DeleteCommentOrReplyFuncType;
    showDeleteModal: boolean;
    updateComment: UpdateCommentOrReplyArgsType;
  } = useContext(CommentContext);

  const { id, score, createdAt, user, content, replies } = comment;

  const [isCurrentUser, setIsCurrentUser] = useState(false);

  const [editComment, setEditComment] = useState(false);

  const [editText, setEditText] = useState(content);

  const [createReply, setCreateReply] = useState(false);

  const [dateDifference, setDateDifference] = useState<string | null>(null);

  const isMounted = useRef(true);
  const isMounted2 = useRef(true);

  useEffect(() => {
    if (isMounted2) {
      currentUser.username === user.username && setIsCurrentUser(true);
    }
    return () => {
      isMounted2.current = false;
    };
  }, [currentUser.username, isCurrentUser, user.username, isMounted2]);

  useEffect(() => {
    if (isMounted) {
      setDateDifference(timeDifference(new Date(), new Date(createdAt)));
      setInterval(() => {
        if (new Date(createdAt).getTime() > 0) {
          setDateDifference(timeDifference(new Date(), new Date(createdAt)));
        }
      }, 4000);
    }
    return () => {
      isMounted.current = false;
    };
  }, [createdAt]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateComment(editText, id);
    setEditComment(false);
  };

  return (
    <>
      {showDeleteModal && <DeleteModal />}
      <div className={editComment ? "comment editComment" : "comment"}>
        <div className="vote">
          <img
            src={plusIcon}
            alt="+"
            className="clickable"
            onClick={() => changeScore("INC", id)}
          />
          <p>{score}</p>
          <img
            src={minusIcon}
            alt="-"
            className="clickable"
            onClick={() => changeScore("DEC", id)}
          />
        </div>
        <div className="commentContent">
          <div className="title">
            <img
              src={require(`../assets${user.image.png.slice(1)}`)}
              alt="User"
              className="avatar"
            />
            <p className="username">{user.username}</p>
            {isCurrentUser && <p className="currentUser">you</p>}
            <p className="time">
              {dateDifference ? dateDifference : createdAt}
            </p>
          </div>
          {editComment ? (
            <form className="commentForm updateForm" onSubmit={handleSubmit}>
              <textarea
                className="inputComment"
                style={{ height: "4rem", width: "36rem" }}
                autoFocus
                value={editText}
                onChange={(event) => setEditText(event.target.value)}
              />

              <button className="submit update">UPDATE</button>
            </form>
          ) : (
            <p className="commentText"> {content}</p>
          )}
        </div>
        {isCurrentUser ? (
          <>
            <div className="reply">
              <div className="button delete" onClick={() => deleteComment(id)}>
                <DeleteIcon className="icon" />
                <p>&nbsp; Delete</p>
              </div>
              <p>&nbsp; &nbsp; &nbsp;</p>
              <div
                className="button edit"
                onClick={() => setEditComment(!editComment)}
              >
                <EditIcon className="icon" />
                <p>&nbsp; Edit</p>
              </div>
            </div>
          </>
        ) : (
          <div
            className="reply button edit"
            onClick={() => setCreateReply(!createReply)}
          >
            <ReplyIcon className="icon" />
            <p>&nbsp; Reply</p>
          </div>
        )}
      </div>
      {createReply && (
        <CreateComment key={id} buttonText="REPLY" commentId={id} />
      )}
      <div className="container">
        {replies && (
          <div className="line">
            {replies.map((reply: ReplyType, id: number) => (
              <CommentReply key={id} reply={reply} commentId={comment.id} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default CommentItem;
