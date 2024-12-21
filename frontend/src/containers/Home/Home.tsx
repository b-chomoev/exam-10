import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectFetchLoading, selectNews } from '../../store/slices/newsSlice';
import { useEffect } from 'react';
import { fetchPosts } from '../../store/thunks/newsThunks';
import Spinner from '../../components/UI/Spinner/Spinner';
import NewsItem from '../../components/NewsItem/NewsItem';

const Home = () => {
  const dispatch = useAppDispatch();
  const news = useAppSelector(selectNews);
  const isFetchNewsLoading = useAppSelector(selectFetchLoading);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <>
      <div className='d-flex align-items-center justify-content-between'>
        <h1>Posts</h1>
        <NavLink to='/new-post' className='btn btn-dark'>Add new post</NavLink>
      </div>

      {isFetchNewsLoading ? <Spinner/> :
        <>
          {news.length === 0 && !isFetchNewsLoading ? <h2>No posts yet</h2> :
            <>
              {news.map((post) => (
                <NewsItem
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  content={post.content}
                  image={post.image}
                  date={post.date}
                />
              ))}
            </>
          }
        </>
      }
    </>
  );
};

export default Home;