import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    navigate('/login');
  };

  return (
    <nav className="main-navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/product">Product</Link></li>
        <li><Link to="/about">About</Link></li>
        {token ? (
          <>
            {userRole === 'admin' && <li><Link to="/admin">Admin Panel</Link></li>}
            <li><Link to="/dashboard">My Dashboard</Link></li>
            <li><button type="button" className="nav-logout" onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <>
            <li className='login'><Link to="/login">Login</Link></li>
            <li className='signup'><Link to="/signup">Sign Up</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
