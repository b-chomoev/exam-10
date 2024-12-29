interface IPost {
  _id: string;
  title: string;
  description?: string;
  image: string;
  date: string;
}

interface IPostMutation {
  title: string;
  description: string;
  image: string | null;
}

interface IComment {
  _id: string;
  author: string;
  text: string;
}

interface ICommentMutation {
  author: string;
  text: string;
}