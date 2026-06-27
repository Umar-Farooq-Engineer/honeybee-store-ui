import React from 'react';
import { Link } from 'react-router-dom';

const EditProduct = () => {
  return (
    <div style={{ padding: '24px' }}>
      <h2>Edit Product</h2>
      <p>To edit a product, go to the product list and click the edit button on the product card.</p>
      <Link to="/admin/viewproduct">
        <button>View Products</button>
      </Link>
    </div>
  );
};

export default EditProduct;
