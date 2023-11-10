import { useContext } from "react";
import CommentContext from "../context/CommentContext";
import CommentItem from "./CommentItem";
import { CommentType } from "../types";
import DeleteModal from "./DeleteModal";

const CommentList = () => {
  const { comments }: { comments: CommentType[] } = useContext(CommentContext);
  return (
    <>
      {comments.map((comment: CommentType, id: number) => (
        <CommentItem key={id} comment={comment} />
      ))}
      <DeleteModal />
    </>
  );
};

export default CommentList;
