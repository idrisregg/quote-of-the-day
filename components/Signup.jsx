import React from "react";
import './signup.css'
import {useNavigate} from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  async function handleSignup() {
    navigate('/register');
  }

  return (
    <>
      <button className="signup-button" onClick={handleSignup}>Sign Up</button>
    </>
  );   
};

export default Signup;
