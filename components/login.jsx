import React from "react";
import './login.css'
import {useNavigate} from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  function handleLogin() {
    navigate('/login'); 
  }
   
  return (
    <>
    <button className="login-button" onClick={handleLogin}>Login</button>
    </>
  );
}

export default Login;
