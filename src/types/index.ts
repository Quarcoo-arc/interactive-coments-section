type UserType = {
  image: {
    png: string;
    webp: string;
  };
  username: string;
};

type CommentType = {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: UserType;
  replies: ReplyType[];
};

type ReplyType = {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: UserType;
  replyingTo: string;
};

interface UserInfoType {
  currentUser: UserType;
  comments: CommentType[];
}

type CreateCommentProps = {
  buttonText?: "REPLY";
  commentId?: number;
  replyId?: number;
};

type CommentReplyProps = {
  reply: ReplyType;
  commentId: number;
};

type ChangeScoreFuncType = (
  whereTo: "INC" | "DEC",
  commentId: number,
  replyId?: number
) => void;

type DeleteCommentOrReplyFuncType = (
  commentId: number,
  replyId?: number
) => void;

type UpdateCommentOrReplyArgsType = (
  message: string,
  commentId: number,
  replyId?: number
) => void;

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
};

export {
  type UserInfoType,
  type CommentType,
  type CreateCommentProps,
  type CommentReplyProps,
  type ReplyType,
  type UserType,
  type ChangeScoreFuncType,
  type DeleteCommentOrReplyFuncType,
  type UpdateCommentOrReplyArgsType,
  type ModalProps,
};
