import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();

    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("Please enter both email and password");
      return;
    }


    try {

      const response = await fetch(
        "https://honeybee-backend-vl3k.onrender.com/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );


      const data = await response.json();


      if (response.ok) {

        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.user.role);
        localStorage.setItem("email", data.user.email);


        if (data.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/product");
        }


      } else {

        // wrong password / invalid login
        if (
          data.message?.toLowerCase().includes("password") ||
          data.message?.toLowerCase().includes("invalid")
        ) {

          setErrorMessage(
            "Password does not match. Please try again."
          );

        } else {

          setErrorMessage(
            data.message || "Failed to login"
          );

        }

      }


    } catch (error) {

      console.error(error);

      setErrorMessage(
        "Something went wrong. Please try again."
      );

    }
  };


  return (

    <div className="login-container">

      <div className="login-card">

        <h1 className="login-title">
          Welcome Back
        </h1>


        <p className="login-subtitle">
          Sign in to your account
        </p>



        <form
          onSubmit={handleLogin}
          className="login-form"
        >


          <label>Email</label>

          <input

            type="email"

            placeholder="Email address"

            value={email}

            required

            onChange={(e)=>setEmail(e.target.value)}

          />



          <label>Password</label>


          <input

            type="password"

            placeholder="Password"

            value={password}

            required

            onChange={(e)=>setPassword(e.target.value)}

          />



          {errorMessage && (

            <p className="error-message">
              {errorMessage}
            </p>

          )}



          <button
            type="submit"
            className="login-btn"
          >

            Login

          </button>



          <p className="signup-text">

            Don't have an account?{" "}

            <Link to="/signup" style={{color:"blue",textDecoration:"none"}}>
              Signup
            </Link>

          </p>



        </form>


      </div>

    </div>

  );
};


export default Login;