import React from 'react'
import './Home.css'
import honeyimgh1 from '../../assets/h1.png'
import { Link } from 'react-router-dom'

const Home = () => {
  const product1 = '/images/product%201.png'
  const product2 = '/images/product%202.png'

  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="home-hero-text">
          <p className="home-hero-subtitle">Naturally sourced, expertly packed, and delivered with care.</p>
          <h1 className="home-hero-title">Pure Hills Honey for every table.</h1>
          <p className="home-hero-subtitle">
            Discover premium honey harvested from hilly wildflowers, full of natural sweetness, rich aroma, and real health benefits.
            Make every meal more nourishing with a touch of golden goodness.
          </p>
          <div className="home-hero-buttons">
            <Link to="/product" className="home-hero-button">Shop Honey</Link>
            <Link to="/about" className="home-hero-button-secondary">Learn More</Link>
          </div>
        </div>

        <div className="home-hero-image-wrapper">
          <img
            src={honeyimgh1}
            alt="Pure Hills Honey Jar"
            className="home-hero-image"
          />
        </div>
      </section>

      <section className="home-products">
        <h2 className="home-products-title">Featured Products</h2>
        <div className="product-grid">
          <div className="product-card">
            <img src={product1} alt="Product 1" className="product-image" />
            <h3 className="product-name">Honey Jar Classic</h3>
            <p className="product-description">
              A timeless favorite with smooth texture and floral sweetness, perfect for tea, toast, and desserts.
            </p>
          </div>
          <div className="product-card">
            <img src={product2} alt="Product 2" className="product-image" />
            <h3 className="product-name">Honey Comb Deluxe</h3>
            <p className="product-description">
              Fresh honeycomb straight from the hive, naturally chewy and filled with rich honey flavor.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
