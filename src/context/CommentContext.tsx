import React, { createContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { ReactNode } from "react";
import data from "../data/data.json";
import { UserInfoType, CommentType, ReplyType, UserType } from "../types";

const CommentContext = createContext<any>(null);

export const CommentContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, setState] = useLocalStorage<UserInfoType>("state", data);

  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const [commentToDelete, setCommentToDelete] = useState<{
    commentId: number | null;
    replyId: number | null;
  }>({
    commentId: null,
    replyId: null,
  });

  const [createReply, setCreateReply] = useState<boolean>(false);

  const {
    comments,
    currentUser,
  }: { comments: CommentType[]; currentUser: UserType } = state;

  const addNewComment = (comment: string) => {
    const newComment = {
      id: comments[comments.length - 1].id + 1,
      content: comment,
      createdAt: `${new Date()}`,
      replies: [],
      score: 6,
      user: currentUser,
    };
    comments.push(newComment);
    setState((prevState: UserInfoType) => ({ ...prevState, comments }));
  };

  const addNewReply = (message: string, commentId: number, replyId: number) => {
    const comment = comments.find((item: CommentType) => item.id === commentId);

    const replyToUsername = replyId
      ? comment?.replies.find((item: ReplyType) => item.id === replyId)?.user
          .username
      : comment?.user.username;
    const newReply = {
      id:
        comment && comment.replies.length
          ? comment.replies[comment.replies.length - 1].id + 1
          : 1,
      content: message,
      createdAt: `${new Date()}`,
      replyingTo: replyToUsername ?? "",
      score: 5,
      user: currentUser,
    };
    comment?.replies.push(newReply);
    setState((prevState: UserInfoType) => ({ ...prevState, comments }));
  };

  const updateComment = (
    message: string,
    commentId: number,
    replyId: number
  ) => {
    const comment = comments.find((item: CommentType) => item.id === commentId);
    if (replyId) {
      const reply = comment?.replies.find(
        (item: ReplyType) => item.id === replyId
      );
      if (reply) {
        reply.content = message;
      }
    } else if (!replyId) {
      if (comment) {
        comment.content = message;
      }
    }
    setState((prevState: UserInfoType) => ({ ...prevState, comments }));
  };

  const changeScore = (
    whereTo: "INC" | "DEC",
    commentId: number,
    replyId: number
  ) => {
    const comment = comments.find((item: CommentType) => item.id === commentId);
    if (replyId) {
      const reply = comment?.replies.find(
        (item: ReplyType) => item.id === replyId
      );
      if (reply) {
        whereTo === "INC" ? reply.score++ : reply.score--;
      }
    } else {
      if (comment) {
        whereTo === "INC" ? comment.score++ : comment.score--;
      }
    }
    setState((prevState: UserInfoType) => ({ ...prevState, comments }));
  };

  const deleteComment = (commentId: number, replyId: number) => {
    setShowDeleteModal(true);

    setCommentToDelete({ commentId, replyId });
  };

  const confirmDelete = () => {
    if (!commentToDelete.commentId) {
      setShowDeleteModal(false);
      return;
    }

    if (commentToDelete.commentId && !commentToDelete.replyId) {
      const comment = comments.find(
        (item: CommentType) => item.id === commentToDelete.commentId
      );
      const filtered = comments.filter((item: CommentType) => item !== comment);
      setState((prevState: UserInfoType) => ({
        ...prevState,
        comments: filtered,
      }));
    } else if (commentToDelete.commentId && commentToDelete.replyId) {
      const comment = comments.find(
        (item: CommentType) => item.id === commentToDelete.replyId
      );
      const filtered = comment?.replies.filter(
        (item: ReplyType) => item.id !== commentToDelete.replyId
      );
      if (comment?.replies)
        comment.replies = filtered ? filtered : comment.replies;
      setState((prevState: UserInfoType) => ({ ...prevState, comments }));
    }

    cancelDelete();
  };

  const cancelDelete = () => {
    setCommentToDelete({ commentId: null, replyId: null });

    setShowDeleteModal(false);
  };

  return (
    <CommentContext.Provider
      value={{
        ...state,
        createReply,
        showDeleteModal,
        deleteComment,
        updateComment,
        confirmDelete,
        cancelDelete,
        setCreateReply,
        addNewComment,
        addNewReply,
        changeScore,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};

export default CommentContext;
