import React, { useEffect, useState } from 'react';
import './ApproveOrders.css';
import { Link } from 'react-router-dom';
const ApproveOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');
      
      if (!token) {
        setError('No authentication token found. Please login again.');
        setLoading(false);
        return;
      }
      
      if (role !== 'admin') {
        setError('Access denied: You do not have admin privileges.');
        setLoading(false);
        return;
      }
      
      const res = await fetch('https://honeybee-backend-vl3k.onrender.com/api/orders', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (!res.ok) {
        const data = await res.json();
        setError(data.message || `Server error: ${res.status}`);
        setOrders([]);
        setLoading(false);
        return;
      }
      
      const data = await res.json();
      
      if (data.success) {
        setOrders(data.orders);
        setError('');
      } else {
        setError(data.message || 'Failed to fetch orders');
      }
    } catch (err) {
      setError('Error fetching orders: ' + err.message);
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      setError('');
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('No authentication token found. Please login again.');
        return;
      }
      
      const res = await fetch(`https://honeybee-backend-vl3k.onrender.com/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || `Failed to update order: ${res.status}`);
        console.error('Server error response:', data);
        return;
      }

      const data = await res.json();

      if (data.success) {
        setOrders(orders.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
        setError('');
      } else {
        setError(data.message || 'Failed to update order status');
      }
    } catch (err) {
      setError('Error updating order: ' + err.message);
      console.error('Error:', err);
    }
  };

  const approveOrder = (orderId) => {
    updateOrderStatus(orderId, 'paid');
  };

  const rejectOrder = (orderId) => {
    updateOrderStatus(orderId, 'cancelled');
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: '#f59e0b',
      paid: '#3b82f6',
      shipped: '#8b5cf6',
      delivered: '#10b981',
      cancelled: '#ef4444',
    };
    return colors[status] || '#6b7280';
  };

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(o => o.status === filter);

  return (
    <div className="approve-orders-page">
      <h1>Order Management</h1>
<Link className="dashboard-link" to="/admin">Dashboard</Link>

      {error && <p className="error-message">{error}</p>}

      {loading ? (
        <p className="loading">Loading orders...</p>
      ) : (
        <>
          <div className="filter-bar">
            <select value={filter} onChange={(e) => setFilter(e.target.value)} className="filter-select">
              <option value="all">All Orders ({orders.length})</option>
              <option value="pending">Pending ({orders.filter(o => o.status === 'pending').length})</option>
              <option value="paid">Paid ({orders.filter(o => o.status === 'paid').length})</option>
              <option value="shipped">Shipped ({orders.filter(o => o.status === 'shipped').length})</option>
              <option value="delivered">Delivered ({orders.filter(o => o.status === 'delivered').length})</option>
              <option value="cancelled">Cancelled ({orders.filter(o => o.status === 'cancelled').length})</option>
            </select>
            <button onClick={fetchOrders} className="refresh-btn">🔄 Refresh</button>
          </div>

          {filteredOrders.length === 0 ? (
            <p className="no-orders">No orders found</p>
          ) : (
            <div className="orders-table-container">
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Product</th>
                    <th>Customer Phone</th>
                    <th>Address</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order._id}>
                      <td className="order-id">{order._id.slice(-8)}</td>
                      <td>{order.productName}</td>
                      <td>{order.phone}</td>
                      <td className="address">{order.address}</td>
                      <td>{order.quantity}</td>
                      <td className="price">PKR {order.totalPrice}</td>
                      <td>
                        <span 
                          className="status-badge" 
                          style={{ backgroundColor: getStatusColor(order.status) }}
                        >
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                      <td className="date">{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td className="actions">
                        {order.status === 'pending' ? (
                          <div className="action-buttons">
                            <button 
                              onClick={() => approveOrder(order._id)}
                              className="btn-approve"
                              title="Approve this order"
                            >
                              ✓ Approve
                            </button>
                            <button 
                              onClick={() => rejectOrder(order._id)}
                              className="btn-reject"
                              title="Reject this order"
                            >
                              ✗ Reject
                            </button>
                          </div>
                        ) : (
                          <select 
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                            className="status-select"
                          >
                            <option value="paid">Paid</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ApproveOrders;
