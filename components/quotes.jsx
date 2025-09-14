import React, { useState, useEffect } from "react";
import SaveQuote from "./saveQuote";
import './quotes.css';

const Quotes = () => {
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("./backend/data/quotes.json")
      .then((res) => res.json())
      .then((data) => {
        const today = new Date();
        const start = new Date(today.getFullYear(), 0, 0);
        const diff = today - start;
        const day = Math.floor(diff / (1000 * 60 * 60 * 24));
        setQuote(data[day % data.length]);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading quotes:", err);
        setLoading(false);
      });
  }, []);

  const handleSaveQuote = () => {
    const user = JSON.parse(localStorage.getItem("user")) || { username: "Guest" };
    if (!user.savedQuotes) user.savedQuotes = [];
    if (!user.savedQuotes.includes(quote)) {
      user.savedQuotes.push(quote);
      localStorage.setItem("user", JSON.stringify(user));
      alert("Quote saved!");
    } else {
      alert("Quote already saved!");
    }
  };

  if (loading) return <span>Loading...</span>;
  const user = JSON.parse(localStorage.getItem("user")) || { username: "Guest" };
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