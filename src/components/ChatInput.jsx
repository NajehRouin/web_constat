import React from "react";

const ChatInput = ({ text, onChange, onSend }) => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 15,
        left: 15,
        right: 15,
        display: "flex",
        backgroundColor: "#fff",
      }}
    >
      <input
        type="text"
        value={text}
        onChange={(e) => onChange(e.target.value)}
        style={{
          flex: 1,
          padding: 10,
          borderRadius: "20px",
          border: "1px solid #ccc",
          outline: "none",
          fontSize: 14,
        }}
        placeholder="Écrire un message..."
      />
      <button
        onClick={onSend}
        style={{
          marginLeft: 10,
          padding: "10px 16px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "20px",
          cursor: "pointer",
          fontWeight: 500,
        }}
      >
        Envoyer
      </button>
    </div>
  );
};

export default ChatInput;
