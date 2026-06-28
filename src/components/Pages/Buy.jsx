import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getImageUrl } from "../../utils/api";
import "./BuyerForm.css";

const BuyerForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const product = location.state?.product;

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    quantity: 1,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Check login when page opens
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const validatePhone = (phone) => {
    return /^[0-9]{10,11}$/.test(phone);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const token = localStorage.getItem("token");


    // no token
    if (!token) {
      navigate("/login");
      return;
    }


    if (!product) {
      setError("Please select a product first.");
      return;
    }


    if (!validatePhone(formData.phone)) {
      setError("Phone number must be 10-11 digits.");
      return;
    }


    try {

      const response = await fetch(
        "https://honeybee-backend-vl3k.onrender.com/api/orders/create",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },


          body: JSON.stringify({

            productId: product._id,

            productName: product.name,

            price: product.price,

            totalPrice:
              product.price * Number(formData.quantity),

            name: formData.name,

            address: formData.address,

            phone: formData.phone,

            quantity: Number(formData.quantity),

          }),
        }
      );


      const data = await response.json();


      // expired token
      if (response.status === 401) {

        localStorage.removeItem("token");

        navigate("/login");

        return;
      }


      if (response.ok) {

        setSuccess(
          "Order placed successfully. Redirecting..."
        );


        setFormData({
          name: "",
          address: "",
          phone: "",
          quantity: 1,
        });


        setTimeout(() => {

          navigate("/dashboard");

        }, 1500);


      } else {

        setError(
          data.message || "Failed to place order."
        );

      }


    } catch (error) {

      console.log(error);

      setError(
        "Server error. Please try again."
      );

    }

  };



  return (

    <div className="buyer-form-container">

      <h2>Checkout</h2>


      {product ? (

        <div className="checkout-summary">


          <img

            src={getImageUrl(product.image)}

            alt={product.name}

            className="checkout-image"

            onError={(e) => {

              e.target.src =
                "https://via.placeholder.com/200x200?text=No+Image";

            }}

          />


          <h3>{product.name}</h3>

          <p>{product.detail}</p>

          <p>
            Price: PKR {product.price}
          </p>

          <p>
            Weight: {product.weight}
          </p>


        </div>

      ) : (

        <p>
          Please choose a product first.
        </p>

      )}



      <form
        className="buyer-form"
        onSubmit={handleSubmit}
      >


        <label>Name:</label>

        <input

          type="text"

          name="name"

          value={formData.name}

          onChange={handleChange}

          required

          placeholder="Enter your name"

        />



        <label>Address:</label>

        <textarea

          name="address"

          value={formData.address}

          onChange={handleChange}

          required

          placeholder="Enter your address"

        />



        <label>Phone:</label>

        <input

          type="text"

          name="phone"

          value={formData.phone}

          onChange={handleChange}

          required

          placeholder="03XXXXXXXXX"

        />



        <label>Quantity:</label>

        <input

          type="number"

          name="quantity"

          value={formData.quantity}

          min="1"

          onChange={handleChange}

          required

        />



        {error && (

          <p className="error">
            {error}
          </p>

        )}



        {success && (

          <p className="success">
            {success}
          </p>

        )}



        <button type="submit">

          Place Order

        </button>



        <button

          type="button"

          onClick={() => navigate("/product")}

        >

          Back To Products

        </button>


      </form>


    </div>

  );
};


export default BuyerForm;