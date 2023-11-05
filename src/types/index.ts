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
  replies: CommentType[];
  replyingTo?: string;
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
  reply: CommentType;
  commentId: number;
};

export {
  type UserInfoType,
  type CommentType,
  type CreateCommentProps,
  type CommentReplyProps,
};
