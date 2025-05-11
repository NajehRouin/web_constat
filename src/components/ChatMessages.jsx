import React from "react";

const ChatMessages = ({ messages, searchTerm, messagesEndRef }) => {
  return (
    <div
      style={{
        flex: 1,
        overflowY: "auto",
        padding: "10px",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        marginBottom: "60px",
      }}
    >
      {messages
        .filter((msg) =>
          (msg.message || msg.text)
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        )
        .map((msg, index) => (
          <div
            key={index}
            style={{
              alignSelf: msg?.senderModel === "Admin" ? "flex-end" : "flex-start",
              backgroundColor: msg?.senderModel === "Admin" ? "#007bff" : "#333",
              color: "#fff",
              padding: "10px 15px",
              borderRadius: "18px",
              maxWidth: "70%",
              wordBreak: "break-word",
              fontSize: "14px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>{msg.message || msg.text}</span>
            <span style={{ marginTop: "6px", fontSize: "12px", color: "#ccc" }}>
              {new Date(msg.createdAt).toLocaleString("fr-FR", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </span>
          </div>
        ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
