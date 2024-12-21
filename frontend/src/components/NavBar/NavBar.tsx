import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <>
      <nav className='navbar navbar-expand-lg bg-dark'>
        <div className='container'>
          <NavLink to='/' className='text-decoration-none'><span
            className='navbar-brand mb-0 text-white fs-1'>News</span></NavLink>
        </div>
      </nav>
    </>
  );
};

export default NavBar;