import NavBar from './components/NavBar/NavBar';
import { Route, Routes } from 'react-router-dom';
import NewPost from './containers/NewPost/NewPost';
import Posts from './containers/Posts/Posts';
import FullPost from './containers/FullPost/FullPost';

const App = () => {
  return (
      <>
        <header>
          <NavBar/>
        </header>
        <main className='container mt-4'>
          <Routes>
            <Route path="/" element={<Posts />} />
            <Route path="/posts/:id" element={<FullPost/>} />
            <Route path="/posts/new" element={<NewPost />} />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </main>
      </>
  );
};

export default App;
