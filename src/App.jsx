import { Route, Routes } from 'react-router-dom';
import './App.css'
import MovieCard from './components/movieCard';
import Header from './components/navbar';
import Movies from './components/movies';
import LoginPage from './components/login';
import RegisterPage from './components/register';
import AdminRoute from './components/adminRoute';
import Home from './components/home';
import AccountPage from './components/accoutPage';
import PrivateRoute from './components/privateroute';
import AdminPage from './components/adminDashboard';

function App() {
  return (
    <>
      <Header />
      <Routes>
        {/* public routes */}
        <Route path="/" element={<Home />}></Route>
        <Route path="/movies" element={<Movies />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>

        {/* private routes */}
        <Route
          path="/account"
          element={
            <PrivateRoute>
              <AccountPage />
            </PrivateRoute>
          }
        />

        {/* admin protected routes */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminPage />
            </AdminRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App
