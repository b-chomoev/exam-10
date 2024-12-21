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
        <div className='row'>
          {news.length === 0 && !isFetchNewsLoading ? <h2>No posts yet</h2> :
            <>
              {news.map((post) => (
                <div className='col-sm-4' key={post.id}>
                  <NewsItem
                    id={post.id}
                    title={post.title}
                    content={post.content}
                    image={post.image}
                    date={post.date}
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