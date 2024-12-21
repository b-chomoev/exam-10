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