import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../../utils/api';
import './Product.css';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const params = new URLSearchParams({
        search,
        minPrice: minPrice || 0,
        maxPrice: maxPrice || 9999999,
        page,
        limit: 8,
      });
      const res = await fetch(`https://honeybee-backend-vl3k.onrender.com/api/products`);
      const data = await res.json();
      if (data.success) {
        setProducts(data.products);
        setTotalPages(Math.ceil(data.pagination.total / data.pagination.limit));
      } else {
        setProducts([]);
        setError('Failed to load products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Unable to load products. Please try again.');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [search, minPrice, maxPrice, page]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleFilterReset = () => {
    setSearch('');
    setMinPrice('');
    setMaxPrice('');
    setPage(1);
  };

  return (
    <div className="product-page">
      <h1>All Products</h1>

      <div className="product-filters">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          type="number"
          placeholder="Min price"
          value={minPrice}
          min="0"
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max price"
          value={maxPrice}
          min="0"
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <button type="button" onClick={handleFilterReset}>
          Reset filters
        </button>
        <button type="button" onClick={fetchProducts} className="refresh-btn">
          {loading ? 'Refreshing...' : 'Refresh Products'}
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}
      <div className="product-grid">
        {products.length === 0 ? (
          <p>No products found. Try different filters.</p>
        ) : (
          products.map((product) => (
            <div className="product-card" key={product._id}>
              <div className="product-image-container">
                <img 
                  src={getImageUrl(product.image)} 
                  alt={product.name}
                  crossOrigin="anonymous"
                  onError={(e) => {
                    const placeholderSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" fill="%23f3f4f6"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%239ca3af" font-size="16">No image</text></svg>`;
                    e.target.src = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(placeholderSVG)}`;
                  }}
                />
              </div>
              <h3>{product.name}</h3>
              <p>{product.detail}</p>
              <p><strong>{product.weight}gm</strong></p>
              <p className="price">PKR {product.price}</p>
              <Link to="/buy" state={{ product }}>
                <button>Buy Now</button>
              </Link>
            </div>
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination-controls">
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            Previous
          </button>
          <span>Page {page} of {totalPages}</span>
          <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Product;
