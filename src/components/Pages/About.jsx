import React from "react";

const About = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-amber-50 min-h-screen">
      {/* Header */}
      <h1 className="text-3xl md:text-4xl font-bold text-amber-700 mb-4 text-center">About Pure Hills Honey</h1>
      <p className="text-gray-700 leading-relaxed mb-6 text-lg">
        Welcome to <span className="font-semibold text-amber-600">Pure Hills Honey</span>, your trusted source of
        natural, premium-quality honey. Since our journey began, we’ve been
        passionate about bringing you the purest honey straight from the
        hive—100% natural, raw, and full of health benefits. Our mission is to promote healthy living through nature's sweetest gift.
      </p>

      {/* Services / Highlights */}
      <h2 className="text-2xl md:text-3xl font-semibold text-amber-600 mb-3">Why Choose Us?</h2>
      <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6 text-base md:text-lg">
        <li>🌿 <strong>100% Natural</strong> – Free from additives and preservatives.</li>
        <li>🍯 <strong>One-Year Quality Guarantee</strong> – Fresh, safe, and long-lasting.</li>
        <li>🐝 <strong>Straight from Beekeepers</strong> – Ethical sourcing, no middlemen.</li>
        <li>💛 <strong>Premium Taste</strong> – Rich flavor that makes you come back for more.</li>
      </ul>

      {/* Availability */}
      <h2 className="text-2xl md:text-3xl font-semibold text-amber-600 mb-3">Our Products</h2>
      <p className="text-gray-700 mb-6 text-base md:text-lg">
        We provide a variety of natural honey products including:
      </p>
      <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6 text-base md:text-lg">
        <li>Pure Honey Jars</li>
        <li>Honeycomb</li>
        <li>Special Herbal Infused Honey</li>
        <li>Gift Packs</li>
      </ul>

      {/* Contact Info */}
      <h2 className="text-2xl md:text-3xl font-semibold text-amber-600 mb-3">Contact Us</h2>
      <p className="text-gray-700 mb-2 text-base md:text-lg">
        📞 <strong>Phone:</strong> 0315-6114604
      </p>
      <p className="text-gray-700 mb-2 text-base md:text-lg">
        📧 <strong>Email:</strong> ufb482@gmail.com
      </p>
      <p className="text-gray-700 text-base md:text-lg">
        📍 <strong>Location:</strong> Pure Hills Honey Distribution Center, Pakistan
      </p>
    </div>
  );
};

export default About;
