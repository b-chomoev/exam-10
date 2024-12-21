import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectOneFetchLoading, selectOnePost } from '../../store/slices/newsSlice';
import { useEffect } from 'react';
import { getPostById } from '../../store/thunks/newsThunks';
import Spinner from '../../components/UI/Spinner/Spinner';
import dayjs from 'dayjs';
import noPicture from '../../assets/no-picture.png';
import { apiUrl } from '../../globalConstants'; // Ensure this is defined

const OnePost = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const post = useAppSelector(selectOnePost);
  const isFetchLoading = useAppSelector(selectOneFetchLoading);

  useEffect(() => {
    if (id) {
      dispatch(getPostById(id));
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