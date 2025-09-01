import React from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Logout from './components/Logout';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';

function AppContent() {
  const location = useLocation();
  const isLoggedIn = !!(
    localStorage.getItem("token") || sessionStorage.getItem("token")
  );


  return (
    <>

      <Routes>
        {/* Redirect root to dashboard if logged in, else to login */}
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
        />

        {/* Public routes */}
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route
          path="/register"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <Register />}
        />

        {/* Protected dashboard */}
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
        />

        {/* Logout */}
        <Route path="/logout" element={<Logout />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {/* Global toast messages */}
      <ToastContainer position="top-right" autoClose={3000} theme="light" />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
