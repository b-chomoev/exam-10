import { NavLink } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <div className='d-flex align-items-center justify-content-between'>
        <h1>Posts</h1>
        <NavLink to='/new-post' className='btn btn-dark'>Add new post</NavLink>
      </div>
    </>
  );
};

export default Home;