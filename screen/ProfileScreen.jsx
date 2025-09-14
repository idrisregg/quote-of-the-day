import React, { useEffect, useState } from "react";
import './profileScreen.css';
import { useNavigate } from "react-router-dom";

function ProfileScreen() {
  const user = JSON.parse(localStorage.getItem("user")) || { username: "Guest" };
  const [savedQuotes, setSavedQuotes] = useState([]);
  const navigator = useNavigate();

  useEffect(() => {
    document.title = "Profile";
    if (user.username !== "Guest") {
      fetch(`http://localhost:5100/api/get-saved-quotes?username=${user.username}`)
        .then(res => res.json())
        .then(data => setSavedQuotes(data.savedQuotes || []))
        .catch(() => setSavedQuotes([]));
    }
  }, [user.username]);

  return (
    <div className="profile-screen">
      <h1>{user.username}</h1>
      <h2>Saved Quotes :</h2>
      <ul>
        {savedQuotes.length > 0 ? (
          savedQuotes.map((quote, index) => (
            <li key={index}>{quote}</li>
          ))
        ) : (
          <li>No saved quotes</li>
        )}
      </ul>
      <button className="return-button" onClick={() => navigator("/")}>Return</button>
    </div>
  );
}

export default ProfileScreen;
