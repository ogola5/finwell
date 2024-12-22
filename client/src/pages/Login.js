import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';  // Importing the CSS file



const Login = ({ onLogin }) => {  // Accept onLogin as a prop
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState(null); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  
  //   try {
  //     const response = await fetch("http://localhost:5000/api/login", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(credentials),
  //     });
  
  //     const data = await response.json();
  
  //     if (!response.ok) {
  //       throw new Error(data.message || "Login failed");
  //     }
  
  //     localStorage.setItem("token", data.token);
  //     localStorage.setItem("user", JSON.stringify(data.user));
  
  //     // Redirect based on KYC status
  //     if (data.user.kycCompleted) {
  //       navigate("/dashboard");
  //     } else {
  //       navigate("/kyc");
  //     }
  //   } catch (err) {
  //     setError(err.message);
  //     console.error("[LOGIN ERROR] Error during login:", err.message);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
  
      const data = await response.json();
      console.log("[LOGIN RESPONSE] API response data:", data);
  
      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }
  
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
  
      if (data.user.kycCompleted) {
        console.log("Navigating to /dashboard");
        navigate("/dashboard");
      } else {
        console.log("Navigating to /kyc");
        navigate("/kyc");
      }
    } catch (err) {
      setError(err.message);
      console.error("[LOGIN ERROR] Error during login:", err.message);
    }
  };
  
  
  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={credentials.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>

      <div className="signup-link">
        <p>Don't have an account? <a href="/signup">Sign Up</a></p>
      </div>
    </div>
  );
};

export default Login;