import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../../utils/api";
import "./ViewProduct.css";
import { Link } from "react-router-dom";
const ViewProduct = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("import.meta.env.VITE_API_URL/api/products");
        const data = await res.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (res.ok) {
        setProducts(products.filter((p) => p._id !== id));
        alert("Product deleted successfully!");
      } else {
        alert("Failed to delete product.");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Edit product → send product data to AddProduct form
  const handleEdit = (product) => {
    navigate("/admin/addproduct", { state: { product } });
  };

  return (
    <div className="product-page">
      <h1>Manage Products</h1>

<Link className="dashboard-link" to="/admin">Dashboard</Link>
      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product._id}>
            <div className="product-image-container">
              <img
                src={getImageUrl(product.image)}
                alt={product.name}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/200x200?text=Image+Not+Found';
                }}
              />
            </div>
            <h3>{product.name}</h3>
            <p>{product.detail}</p>
            <p>
              <strong>{product.weight}</strong>
            </p>
            <p className="price">PKR {product.price}</p>

            {/* Admin Actions */}
            <div className="admin-actions">
              <button onClick={() => handleEdit(product)}>✏️ Edit</button>
              <button onClick={() => handleDelete(product._id)}>🗑️ Delete</button>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewProduct;
