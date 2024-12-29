import NavBar from './components/NavBar/NavBar';
import { Route, Routes } from 'react-router-dom';
import Home from './containers/Home/Home';
import NewPost from './containers/NewPost/NewPost';
import OnePost from './containers/OnePost/OnePost';
import Posts from './containers/Posts/Posts';

const App = () => {
  return (
      <>
        <header>
          <NavBar />
        </header>
        <main className='container mt-4'>
          <Routes>
            <Route path="/" element={<Posts />} />
            <Route path="/posts/:id" element={<OnePost />} />
            <Route path="/posts/new" element={<NewPost />} />
            {/*<Route path="/posts" element={<Home />} />*/}
            <Route path="*" element={<h2>Not Found</h2>} />
          </Routes>
        </main>
      </>
  );
};

export default App;
