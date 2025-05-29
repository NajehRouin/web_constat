import React from "react";

const ChatSidebar = ({ users, selectedUser, onSelectUser, userSearch, onSearchChange }) => {
  return (
    <div
      style={{
        width: "25%",
        backgroundColor: "#f0f2f5",
        padding: "15px",
        borderRight: "1px solid #ccc",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h3 style={{ marginBottom: 10, fontSize: 18, fontWeight: 600 }}>Utilisateurs</h3>

      <input
        type="text"
        placeholder="Rechercher un utilisateur..."
        value={userSearch}
        onChange={(e) => onSearchChange(e.target.value)}
        style={{
          padding: "8px 12px",
          marginBottom: 15,
          borderRadius: "20px",
          border: "1px solid #ccc",
          outline: "none",
          fontSize: "14px",
        }}
      />

      <div style={{ overflowY: "auto", flex: 1 }}>
        {users
          .filter((user) =>
            (user.name || user.email)?.toLowerCase().includes(userSearch.toLowerCase())
          )
          .map((user) => (
            <div
              key={user._id}
              onClick={() => onSelectUser(user)}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 12px",
                marginBottom: 10,
                borderRadius: 10,
                backgroundColor: selectedUser?._id === user._id ? "#e4e6eb" : "#fff",
                cursor: "pointer",
                boxShadow:
                  selectedUser?._id === user._id
                    ? "inset 0 0 0 2px #007bff"
                    : "0 1px 3px rgba(0,0,0,0.1)",
              }}
            >
              <div
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: "50%",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  marginRight: 10,
                  fontSize: 14,
                }}
              >
                {(user.name || user.cin)?.charAt(0).toUpperCase()}
              </div>
              <div style={{ fontWeight: 500, fontSize: 15 }}>{user.name || user.email}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ChatSidebar;
