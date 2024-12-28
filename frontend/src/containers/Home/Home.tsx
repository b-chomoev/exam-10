import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectDeleteLoading, selectFetchLoading, selectAllPosts } from '../Posts/slices/postsSlice';
import { useEffect } from 'react';
import { deletePost, fetchAllPosts } from '../Posts/thunks/postsThunks';
import Spinner from '../../components/UI/Spinner/Spinner';
import NewsItem from '../../components/NewsItem/NewsItem';
import dayjs from 'dayjs';

const Home = () => {
  const dispatch = useAppDispatch();
  const news = useAppSelector(selectAllPosts);
  const isFetchNewsLoading = useAppSelector(selectFetchLoading);
  const deleteLoading = useAppSelector(selectDeleteLoading);

  useEffect(() => {
    dispatch(fetchAllPosts());
  }, [dispatch]);

  const deletePostById = async (id: string | undefined) => {
    if (id) {
      await dispatch(deletePost(id));
    }

    await dispatch(fetchAllPosts());
  };

  return (
    <>
      <div className='d-flex align-items-center justify-content-between'>
        <h1>Posts</h1>
        <NavLink to='/new-post' className='btn btn-dark'>Add new post</NavLink>
      </div>

      {isFetchNewsLoading || deleteLoading ? <Spinner/> :
        <div className='row'>
          {news.length === 0 && !isFetchNewsLoading ? <h2>No posts yet</h2> :
            <>
              {news.map((post) => (
                <div className='col-sm-4' key={post.id}>
                  <NewsItem
                    id={post.id}
                    title={post.title}
                    image={post.image}
                    date={dayjs(post.date).format('DD/MM/YYYY')}
                    onDelete={() => deletePostById(post.id)}
                  />
                </div>
              ))}
            </>
          }
        </div>
      }
    </>
  );
};

export default Home;