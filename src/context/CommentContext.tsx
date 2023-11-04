import React, { createContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { ReactNode } from "react";
import data from "../data/data.json";
import { CommentContextType, CommentType } from "./types";

const CommentContext = createContext<CommentContextType | null>(null);

export const CommentContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, setState] = useLocalStorage("state", data);

  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const [commentToDelete, setCommentToDelete] = useState<{
    commentId: number | null;
    replyId: number | null;
  }>({
    commentId: null,
    replyId: null,
  });

  const [createReply, setCreateReply] = useState<boolean>(false);

  const { comments, currentUser } = state;

  const addNewComment = (comment: string) => {
    const newComment = {
      id: comments.at(comments.length - 1).id + 1,
      content: comment,
      createdAt: new Date(),
      replies: [],
      score: 6,
      user: currentUser,
    };
    comments.push(newComment);
    setState((prevState: CommentType) => ({ ...prevState, comments }));
  };

  const addNewReply = (message: string, commentId: number, replyId: number) => {
    const comment = comments.find((item: CommentType) => item.id === commentId);
    const replyToUsername = replyId
      ? comment.replies.find((item: CommentType) => item.id === replyId).user
          .username
      : comment.user.username;
    const newReply = {
      id: comment.replies.length
        ? comment.replies.at(comment.replies.length - 1).id + 1
        : 1,
      content: message,
      createdAt: new Date(),
      replyingTo: replyToUsername,
      score: 5,
      user: currentUser,
    };
    comment.replies.push(newReply);
    setState((prevState: CommentContextType) => ({ ...prevState, comments }));
  };

  const updateComment = (
    message: string,
    commentId: number,
    replyId: number
  ) => {
    const comment = comments.find((item: CommentType) => item.id === commentId);
    if (replyId) {
      const reply = comment.replies.find(
        (item: CommentType) => item.id === replyId
      );
      reply.content = message;
    } else if (!replyId) {
      comment.content = message;
    }
    setState((prevState: CommentContextType) => ({ ...prevState, comments }));
  };

  const changeScore = (whereTo: string, commentId: number, replyId: number) => {
    const comment = comments.find((item: CommentType) => item.id === commentId);
    if (replyId) {
      const reply = comment.replies.find(
        (item: CommentType) => item.id === replyId
      );
      whereTo === "INC" ? reply.score++ : reply.score--;
    } else {
      whereTo === "INC" ? comment.score++ : comment.score--;
    }
    setState((prevState: CommentContextType) => ({ ...prevState, comments }));
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
    const comment = comments.find(
      (item: CommentType) => item.id === commentToDelete.commentId
    );
    let filtered: CommentType[];
    if (commentToDelete.commentId && !commentToDelete.replyId) {
      filtered = comments.filter((item: CommentType) => item !== comment);
      setState((prevState: CommentContextType) => ({
        ...prevState,
        comments: filtered,
      }));
    } else if (commentToDelete.commentId && commentToDelete.replyId) {
      filtered = comment.replies.filter(
        (item: CommentType) => item.id !== commentToDelete.replyId
      );
      comment.replies = filtered;
      setState((prevState: CommentContextType) => ({ ...prevState, comments }));
    }

    cancelDelete();
  };

  const cancelDelete = () => {
    setCommentToDelete({ commentId: null, replyId: null });

    setShowDeleteModal(false);
  };

  const timeDifference = (date1: Date, date2: Date) => {
    var difference = date1.getTime() - date2.getTime();

    var daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
    difference -= daysDifference * 1000 * 60 * 60 * 24;

    var hoursDifference = Math.floor(difference / 1000 / 60 / 60);
    difference -= hoursDifference * 1000 * 60 * 60;

    var minutesDifference = Math.floor(difference / 1000 / 60);
    difference -= minutesDifference * 1000 * 60;

    var secondsDifference = Math.floor(difference / 1000);

    if (daysDifference >= 1) {
      return daysDifference + "days ago";
    } else if (hoursDifference >= 1) {
      return hoursDifference + "hours ago";
    } else if (minutesDifference >= 1) {
      return minutesDifference + "minutes ago";
    } else if (secondsDifference >= 1) {
      return secondsDifference + "seconds ago";
    } else {
      return "now";
    }
  };

  return (
    <CommentContext.Provider
      value={{
        ...state,
        createReply,
        showDeleteModal,
        timeDifference,
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
