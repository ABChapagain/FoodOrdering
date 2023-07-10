import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage';
import PageNotFound from './pages/PageNotFound';
import Register from './pages/Auth/Register';
import { ToastContainer } from 'react-toastify';



function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route exact path='/' element={<HomePage />} />
        <Route exact path='/register' element={<Register />} />
        <Route exact path='*' element={<PageNotFound />} />
      </Routes>

    </>
  );
}

export default App;
