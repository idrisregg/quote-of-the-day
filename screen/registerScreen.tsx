import React, { useEffect, useState } from "react";
import "./registerScreen.scss";
import { useNavigate } from "react-router-dom";

const RegisterScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Register";
    
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      navigate("/"); 
    }
  }, [navigate]);

  const validateForm = () => {
    if (!username.trim() || !password.trim()) {
      setMessage("Please fill in all fields");
      return false;
    }

    if (username.length < 3) {
      setMessage("Username must be at least 3 characters long");
      return false;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters long");
      return false;
    }

    if (confirmPassword && password !== confirmPassword) {
      setMessage("Passwords do not match");
      return false;
    }

    return true;
  };

  function goToSignIn() {
    navigate('/login');
  }

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      console.log(" Attempting registration for:", username);
      
      const res = await fetch("http://localhost:5100/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          username: username.trim(), 
          password: password 
        }),
      });

      const data = await res.json();
      console.log(" Registration response:", data);
      
      setMessage(data.message);

      if (res.ok) {
        console.log(" Registration successful!");
        setUsername("");
        setPassword("");
        setConfirmPassword("");
        
        setTimeout(() => {
          goToSignIn();
        }, 2000);
      }
    } catch (err) {
      console.error(" Registration error:", err);
      setMessage("Network error. Please check if the server is running.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-screen">
      <div className="register-container">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Username (min 3 characters)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={isLoading}
          />
          <br />
          <input
            type="password"
            placeholder="Password (min 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
          <br />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required={password.length > 0}
            disabled={isLoading}
          />
          <br />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>
        {message && (
          <p style={{ 
            color: message.includes("successful") ? "green" : "red",
            marginTop: "10px",
            textAlign: "center"
          }}>
            {message}
          </p>
        )}
        <p>already have an account? <a href="/login">Sign in</a></p>
      </div>
    </div>
  );
};

export default RegisterScreen;