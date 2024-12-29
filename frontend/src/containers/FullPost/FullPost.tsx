import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectOnePost } from '../Posts/slices/postsSlice';
import { useEffect } from 'react';
import { fetchOnePost } from '../Posts/thunks/postsThunks';
import { apiUrl } from '../../globalConstants';
import noPicture from '../../assets/no-picture.png';
import dayjs from 'dayjs';
import NewCommentForm from '../Comments/components/NewCommentForm/NewCommentForm';
import { addNewComment } from '../Comments/thunks/commensThunks';

const FullPost = () => {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const post = useAppSelector(selectOnePost);

  useEffect(() => {
    if (id) {
      dispatch(fetchOnePost(id));
    }
  }, [dispatch]);

  const addNewCommentSubmit = (comment: ICommentMutation) => {
    if (id) {
      dispatch(addNewComment({...comment, post: id}));
    }
  };

  return (
    <>
      {post ?
        <div>
          <img src={post.image ? `${apiUrl}/${post.image}` : noPicture} alt={post.title}
               style={{width: '25%', height: 'auto', objectFit: 'cover'}}/>
          <h2 className="mt-3">{post.title}</h2>
          <p>{dayjs(post.date).format('DD/MM/YYYY')}</p>
          <p>{post.description}</p>
        </div>
        : <h2>Post not found</h2>}

      <hr/>

      <NewCommentForm onSubmit={addNewCommentSubmit} />
    </>
  );
};

export default FullPost;