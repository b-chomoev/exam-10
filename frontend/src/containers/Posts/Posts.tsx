import { useAppDispatch, useAppSelector } from '../../app/hooks';
import  { useEffect } from 'react';
import { fetchAllPosts } from './thunks/postsThunks';
import { NavLink } from 'react-router-dom';
import { selectAllPosts, selectDeleteLoading, selectFetchLoading } from './slices/postsSlice';
import Spinner from '../../components/UI/Spinner/Spinner';
import dayjs from 'dayjs';
import { apiUrl } from '../../globalConstants';
import notFound from '../../assets/no-picture.png';

const Posts = () => {
  const posts = useAppSelector(selectAllPosts);
  const isFetchNewsLoading = useAppSelector(selectFetchLoading);
  const deleteLoading = useAppSelector(selectDeleteLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllPosts());
  }, []);

  return (
    <>
      <div className='d-flex align-items-center justify-content-between'>
        <h1>Posts</h1>
        <NavLink to='/posts/new' className='btn btn-dark'>Add new post</NavLink>
      </div>

      {isFetchNewsLoading || deleteLoading ? <Spinner/> :
        <div className='row'>
          {posts.length === 0 && !isFetchNewsLoading ? <h2>No posts yet</h2> :
            <>
              {posts.map((post) => (
                <div className='col-sm-4' key={post._id}>
                  <div className="card mt-2">
                    <img src={post.image ? `${apiUrl}/${post.image}` : notFound} className="card-img-top" alt={post.title}
                         style={{width: '100%', height: '300px', objectFit: 'cover'}}/>
                    <div className="card-body">
                      <h5 className="card-title">{post.title}</h5>
                      <p className="card-text">{dayjs(post.date).format('MM/DD/YYYY')}</p>
                      <NavLink to={`/posts/${post._id}`} className="btn btn-primary">Read more</NavLink>
                      <button className='btn btn-danger ms-3'>Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          }
        </div>
      }
    </>
  );
};

export default Posts;