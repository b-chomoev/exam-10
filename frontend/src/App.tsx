import NavBar from './components/NavBar/NavBar';
import { Route, Routes } from 'react-router-dom';
import Home from './containers/Home/Home';

const App = () => {
  return (
      <>
        <header>
          <NavBar />
        </header>
        <main className='container mt-4'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<h2>Not Found</h2>} />
          </Routes>
        </main>
      </>
  );
};

export default App;
