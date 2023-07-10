import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage';
import PageNotFound from './pages/PageNotFound';
import Register from './pages/Auth/Register';
import { ToastContainer } from 'react-toastify';
import Login from './pages/Auth/Login';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/Routes/Private';
import ForgotPassword from './pages/Auth/ForgotPassword';
import AdminRoute from './components/Routes/AdminRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';




function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route exact path='/' element={<HomePage />} />
        <Route path='/dashboard' element={<PrivateRoute />}>
          <Route path='user' element={<Dashboard />} />
        </Route>
        <Route path='/dashboard' element={<AdminRoute />}>
          <Route path='admin' element={<AdminDashboard />} />
        </Route>
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/forgot-password' element={<ForgotPassword />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='*' element={<PageNotFound />} />
      </Routes>

    </>
  );
}

export default App;
