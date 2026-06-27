import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ totalProducts: 0, lowStock: 0 });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/products/admin/stats', {
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        const data = await res.json();
        if (res.ok) {
          setStats(data.stats);
        } else {
          setError(data.message || 'Unable to load stats');
        }
      } catch {
        setError('Unable to load admin stats');
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="admin-dashboard">
      <nav className="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li><Link to="/admin/addproduct">Add Product</Link></li>
          <li><Link to="/admin/editproduct">Edit Product</Link></li>
          <li><Link to="/admin/viewproduct">View Products</Link></li>
          <li><Link to="/admin/approveorders">Approve Orders</Link></li>
          <li><Link to="/">Go Back to Home</Link></li>
        </ul>
      </nav>

      <main className="main-content">
        <h1>Admin Dashboard</h1>
        <p>Manage your products and orders efficiently.</p>
        {error && <p className="error-message">{error}</p>}
        <div className="dashboard-cards">
          <div className="dashboard-card">
            <h3>Total Products</h3>
            <p>{stats.totalProducts}</p>
          </div>
          <div className="dashboard-card">
            <h3>Low Stock Items</h3>
            <p>{stats.lowStock}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
