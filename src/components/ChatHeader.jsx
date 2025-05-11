import React from "react";

const ChatHeader = ({ name }) => {
  return (
    <h3 style={{ marginBottom: 10 }}>
      Discussion avec {name || "..."}
    </h3>
  );
};

export default ChatHeader;
