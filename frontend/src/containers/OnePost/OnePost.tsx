import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectOnePost } from '../Posts/slices/postsSlice';
import { useEffect } from 'react';
import { fetchOnePost } from '../Posts/thunks/postsThunks';
import Spinner from '../../components/UI/Spinner/Spinner';
import dayjs from 'dayjs';
import noPicture from '../../assets/no-picture.png';
import { apiUrl } from '../../globalConstants'; // Ensure this is defined

const OnePost = () => {


  useEffect(() => {
    if (id) {
      dispatch(fetchOnePost(id));
    }
  }, [dispatch]);

  return (
    <>
      {isFetchLoading ? <Spinner/> :
        <>
          {post ?
            <div>
              <img src={post.image ? `${apiUrl}/${post.image}` : noPicture} alt={post.title} style={{width: 'auto'}}/>
              <h2 className='mt-3'>{post.title}</h2>
              <p>{dayjs(post.date).format('DD/MM/YYYY')}</p>
              <p>{post.content}</p>
            </div>
            : <h2>Post not found</h2>}
        </>
      }
      <h2 className='mt-5'>Comments</h2>

    </>
  );
};

export default OnePost;