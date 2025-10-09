import React, { useEffect, useState } from "react";
import './profileScreen.scss';
import { useNavigate } from "react-router-dom";

function ProfileScreen() {
  const user = JSON.parse(localStorage.getItem("user") || '{ username: "Guest" }');
  const [savedQuotes, setSavedQuotes] = useState([]);
  const navigator = useNavigate();

  useEffect(() => {
    document.title = "Profile";
    if (user.username !== "Guest") {
      fetch(`/api/get-saved-quotes?username=${user.username}`)
        .then(res => res.json())
        .then(data => setSavedQuotes(data.savedQuotes || []))
        .catch(() => setSavedQuotes([]));
    }
  }, [user.username]);

  const deleteUser = () => {
    fetch(`/api/delete-user?username=${user.username}`, {
        method: 'DELETE',
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Delete request failed');
        }
        return res.json();
    })
    .then(data => {
        if (data.message === 'User deleted successfully') {
            localStorage.removeItem("user");
            localStorage.removeItem('token');
            window.location.href = "/";
            user({ username: "Guest" }); 
        } else {
            console.error('Delete failed:', data.message);
        }
    })
    .catch(error => {
        console.error('Error deleting user:', error);
    });
}

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
      <button className="delete-button" onClick={()=>{deleteUser();navigator("/");}}>Delete Account</button>
    </div>
  );
}

export default ProfileScreen;
