import React, { useEffect, useState } from 'react';
import { authHeader, fetchJson } from '../../utils/api';
import './BuyerForm.css';

const UserDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await fetchJson('/api/orders/my-orders', {
        headers: { 'Content-Type': 'application/json', ...authHeader() },
      });
      setOrders(data.orders);
      setLastRefresh(new Date());
      setMessage('');
    } catch (error) {
      setMessage(error.message || 'Unable to fetch order history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();

    // Set up polling - refresh orders every 10 seconds
    const pollInterval = setInterval(() => {
      loadOrders();
    }, 10000);

    // Clean up interval on component unmount
    return () => clearInterval(pollInterval);
  }, []);

  return (
    <div className="buyer-form-container">
      <div className="dashboard-header">
        <h2>My Dashboard</h2>
        <button onClick={loadOrders} disabled={loading} className="refresh-button">
          {loading ? '⏳ Refreshing...' : '🔄 Refresh Orders'}
        </button>
      </div>
      <p>Review your order history and track next steps.</p>
      {message && <p className="error">{message}</p>}
      <p className="last-refresh">Last updated: {lastRefresh.toLocaleTimeString()}</p>
      {orders.length === 0 ? (
        <p>No orders found yet. Place an order to get started.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <h3>{order.productName}</h3>
                <span className={`status-badge status-${order.status}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
              <div className="order-details">
                <p><strong>Order ID:</strong> {order._id.slice(-8)}</p>
                <p><strong>Quantity:</strong> {order.quantity}</p>
                <p><strong>Price:</strong> PKR {order.totalPrice}</p>
                <p><strong>Delivery:</strong> {order.address}</p>
                <p><strong>Phone:</strong> {order.phone}</p>
              </div>
              <small>Ordered on: {new Date(order.createdAt).toLocaleString()}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
