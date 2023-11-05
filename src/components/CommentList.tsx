import { useContext } from "react";
import CommentContext from "../context/CommentContext";
import CommentItem from "./CommentItem";

const CommentList = () => {
  const { comments } = useContext(CommentContext);
  return comments.map((comment: string, id: number) => (
    <CommentItem key={id} comment={comment} />
  ));
};

export default CommentList;
