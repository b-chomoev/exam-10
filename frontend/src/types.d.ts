interface IPost {
  id: string;
  title: string;
  content: string;
  image: string | null;
  date: string;
}

interface IPostMutation {
  title: string;
  content: string;
  image: File | null;
}

interface IComment {
  id: string;
  news_id: string;
  author: string;
  content: string;
}