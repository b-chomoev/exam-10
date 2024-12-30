import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectOnePost } from '../Posts/slices/postsSlice';
import { useEffect } from 'react';
import { fetchOnePost } from '../Posts/thunks/postsThunks';
import { apiUrl } from '../../globalConstants';
import noPicture from '../../assets/no-picture.png';
import dayjs from 'dayjs';
import NewCommentForm from '../Comments/components/NewCommentForm/NewCommentForm';
import { addNewComment, deleteComment, getPostComment } from '../Comments/thunks/commensThunks';
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

  const addNewCommentSubmit = async (comment: ICommentMutation) => {
    if (id) {
      await dispatch(addNewComment({...comment, post: id}));
      await dispatch(getPostComment(id));
    }
  };

  const deleteCommentById = async (comment_id: string) => {
    await dispatch(deleteComment(comment_id));

    if (id) {
      await dispatch(fetchOnePost(id));
      await dispatch(getPostComment(id));
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

      <NewCommentForm onSubmit={addNewCommentSubmit} postId=''/>

      <hr/>

      {allComments.length > 0 ?
        <>
          {allComments.map((comment) => (
            <div className="border border-1 mb-4 p-2">
              <h4>{comment.author}</h4>
              <p>{comment.text}</p>
              <button className="btn btn-danger" onClick={() => deleteCommentById(comment._id)}>Delete</button>
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