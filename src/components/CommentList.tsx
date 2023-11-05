import { useContext } from "react";
import CommentContext from "../context/CommentContext";
import CommentItem from "./CommentItem";
import React from "react";
import { CommentType } from "../types";

const CommentList = () => {
  const { comments } = useContext(CommentContext);
  return comments.map((comment: CommentType, id: number) => (
    <CommentItem key={id} comment={comment} />
  ));
};

export default CommentList;
