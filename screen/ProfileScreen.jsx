import React, { useEffect } from "react";
import './profileScreen.css'

function ProfileScreen() {
  const user = JSON.parse(localStorage.getItem("user")) || { username: "Guest" };
  useEffect(() => {
    document.title = "Profile";
  }, []);

  return (
    <div className="profile-screen">
      <h1>{user.username}</h1>
      <h2>Saved Quotes :</h2>
      <ul>
        {user.savedQuotes && user.savedQuotes.length > 0 ? (
          user.savedQuotes.map((quote, index) => (
            <li key={index}>{quote}</li>
          ))
        ) : (
          <li>No saved quotes</li>
        )}
      </ul>
      <button className="return-button" onClick={() => window.location.href = "/"}>Return</button>
    </div>
  );
}

export default ProfileScreen;
