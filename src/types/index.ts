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

interface CommentContextType {
  currentUser: UserType;
  comments: CommentType[];
}

export { CommentContextType, CommentType };
