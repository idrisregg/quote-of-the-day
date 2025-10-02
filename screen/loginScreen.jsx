import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './loginScreen.scss'

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login";
    
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      navigate("/"); 
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    if (!username.trim() || !password.trim()) {
      setMessage("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    try {
      console.log(" Attempting login for:", username);
      
      const res = await fetch("http://localhost:5100/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          username: username.trim(), 
          password: password 
        }),
      });

      const data = await res.json();
      console.log(" Server response:", data);

      if (!res.ok) {
        setMessage(data.message || "Login failed");
        setIsLoading(false);
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      console.log(" Login successful! User saved:", data.user.username);
      
      setMessage("Login successful! Redirecting...");
      
      setTimeout(() => {
        navigate("/");
        window.location.reload(); 
      }, 1000);

    } catch (err) {
      console.error(" Login error:", err);
      setMessage("Network error. Please check if the server is running.");
      setIsLoading(false);
    }
  };

  return (
    <div className="login-screen">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={isLoading}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        {message && (
          <p className={message.includes("successful") ? "success" : "error"}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginScreen;