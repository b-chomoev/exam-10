import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectOnePost } from '../Posts/slices/postsSlice';
import { useEffect } from 'react';
import { fetchOnePost } from '../Posts/thunks/postsThunks';
import { apiUrl } from '../../globalConstants';
import noPicture from '../../assets/no-picture.png';
import dayjs from 'dayjs';
import NewCommentForm from '../Comments/components/NewCommentForm/NewCommentForm';
import { addNewComment, getPostComment } from '../Comments/thunks/commensThunks';
import { selectAllComments } from '../Comments/slices/commentsSlice';

const FullPost = () => {
  const {id} = useParams();
  const allComments = useAppSelector(selectAllComments);
  const dispatch = useAppDispatch();
  const post = useAppSelector(selectOnePost);

  useEffect(() => {
    if (id) {
      dispatch(fetchOnePost(id));
      dispatch(getPostComment(id));
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

      <hr/>

      {allComments.length > 0 ?
        <>
          {allComments.map((comment) => (
            <div className="border border-black mb-4">
              <h4>{comment.author}</h4>
              <p>{comment.text}</p>
            </div>
            ))}
        </>
        :
        null
      }
    </>
  );
};

export default FullPost;