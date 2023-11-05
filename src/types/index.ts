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

export { UserInfoType, CommentType, CreateCommentProps };
