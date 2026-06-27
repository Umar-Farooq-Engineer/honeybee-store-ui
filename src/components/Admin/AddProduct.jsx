import React, { useState, useEffect } from "react";
import "./Addproduct.css";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Addproduct = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // check if we are editing product
  const editingProduct = location.state?.product;

  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [detail, setDetail] = useState("");
  const [weight, setWeight] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState(1);

  // ✅ Prefill form when editing
  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name);
      setDetail(editingProduct.detail);
      setWeight(editingProduct.weight);
      setPrice(editingProduct.price);
      setCategory(editingProduct.category || '');
      setStock(editingProduct.stock || 1);
    }
  }, [editingProduct]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // form data for image + text
    const formData = new FormData();
    if (image) formData.append("image", image);
    formData.append("name", name);
    formData.append("detail", detail);
    formData.append("weight", weight);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("stock", stock);

    try {
      let url = 'import.meta.env.VITE_API_URL/api/products';
      let method = 'POST';

      if (editingProduct) {
        url = `${import.meta.env.VITE_API_URL}/api/products/${editingProduct._id}`;
        method = 'PUT';
      }

      const res = await fetch(url, {
        method,
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await res.json();
      console.log(data);

      if (data.success) {
        alert(editingProduct ? "Product updated successfully" : "Product uploaded successfully");
        navigate("/admin/viewproduct");
      } else {
        alert("Failed to save product.");
      }
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="upload-container">
      <h1 className="upload-title">
        {editingProduct ? "Edit Product" : "Upload Product"}
      </h1>

      <form onSubmit={handleSubmit} className="upload-form">
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          // required only if adding
          required={!editingProduct}
        />

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Enter product name"
        />

        <textarea
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          required
          placeholder="Enter product details"
          rows="3"
        />

        <input
          type="text"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          required
          placeholder="Enter product weight in gm"
        />

        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          placeholder="Product price in PKR"
        />

        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Product category"
        />

        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          min="0"
          required
          placeholder="Stock quantity"
        />

        <button type="submit">
          {editingProduct ? "Update Product" : "Upload Product"}
        </button>

        <Link to="/admin">
          <button type="button" className="back-btn">
            Back To Dashboard
          </button>
        </Link>
      </form>
    </div>
  );
};

export default Addproduct;
