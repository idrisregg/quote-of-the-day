import React, { useState, useEffect } from "react";
import SaveQuote from "./saveQuote.tsx";
import './quotes.scss';

const Quotes = () => {
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("./backend/data/quotes.json")
      .then((res) => res.json())
      .then((data) => {
        const today = new Date();
        const start = new Date(today.getFullYear(), 0, 0);
        const diff = today.getTime() - start.getTime();
        const day = Math.floor(diff / (1000 * 60 * 60 * 24));
        setQuote(data[day % data.length]);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading quotes:", err);
        setLoading(false);
      });
  }, []);

  const handleSaveQuote = async () => {
    const user = JSON.parse(localStorage.getItem("user") || '{"username":"Guest"}');
    if (user.username === "Guest") {
      alert("Please sign in to save quotes.");
      return;
    }
    try {
      const response = await fetch("/api/save-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: user.username, quote }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Quote saved!");
      } else {
        alert(data.message || "Failed to save quote.");
      }
    } catch (err) {
      console.error("Error saving quote:", err);
      alert("Error saving quote.");
    }
  };

  if (loading) return <span>Loading...</span>;
const user = JSON.parse(localStorage.getItem("user") || '{"username":"Guest"}');
  return (
    <div>
      <span>{quote}</span>
      {user.username !== "Guest" && (
        <SaveQuote onSave={handleSaveQuote} />
      )}
    </div>
  );
};

export default Quotes;
