import React from "react";
import './saveQuote.css'

function SaveQuote({ onSave }) {
 
  return (
    <div className="save-quote">
      <button className="save-quote-button" onClick={onSave}>Save Quote</button>
    </div>
  );
}

export default SaveQuote;
