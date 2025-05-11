import React, { useState, useEffect, useRef, useContext } from "react";
import { io } from "socket.io-client";
import AuthContext from "@/auth/context";
import client from "../../api/client";
import notificationSound from "../../assets/sounds/notificationSound.mp3";





import ChatSidebar from "@/components/ChatSidebar";
import ChatHeader from "@/components/ChatHeader";
import ChatMessages from "@/components/ChatMessages";
import ChatInput from "@/components/ChatInput";

export function Chat() {
  const { admin, token } = useContext(AuthContext);
  const socketRef = useRef(null);

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [userSearch, setUserSearch] = useState("");

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!admin) return;

    const socket = io("http://localhost:9000", {
      query: {
        userId: admin.adminId,
        userModel: "Admin",
      },
      transports: ["websocket"],
    });

    socketRef.current = socket;

    socket.on("connection", () => {
      console.log("Socket connecté", socket.id);
    });

    socket.on("newMessage", (newMsg) => {
      const sound = new Audio(notificationSound);
      sound.play();
      setMessages((prev) => [...prev, newMsg]);
    });

    return () => {
      socket.disconnect();
    };
  }, [admin]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await client.get("/users/allUsers");
      setUsers(res.data);
    };
    fetchUsers();
  }, []);

  const handleUserSelect = async (user) => {
    setSelectedUser(user);
    const res = await client.get("/message/getConversationUser/" + user?._id, {
      headers: { "x-auth-token": token },
    });
    setMessages(res?.data?.messages || []);
  };

  const handleSend = async () => {
    if (!text.trim() || !selectedUser) return;

    const message = {
      message: text,
      receiverModel: "User",
    };

    try {
      const res = await client.post(
        "/message/send/" + selectedUser._id,
        JSON.stringify(message),
        {
          headers: { "x-auth-token": token },
        }
      );

      if (res?.status === 201) {
        socketRef.current.emit("newMessage", {
          ...res.data,
          senderModel: "Admin",
        });
        await handleUserSelect(selectedUser);
        setText("");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi :", error);
    }
  };

  return (
    <div style={{ display: "flex", height: "90vh", fontFamily: "sans-serif" }}>
      <ChatSidebar
        users={users}
        selectedUser={selectedUser}
        onSelectUser={handleUserSelect}
        userSearch={userSearch}
        onSearchChange={setUserSearch}
      />

      <div style={{ width: "75%", padding: "15px", display: "flex", flexDirection: "column", position: "relative" }}>
        <ChatHeader name={selectedUser?.name} />

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Rechercher un message..."
          style={{
            marginBottom: "10px",
            padding: "8px 12px",
            borderRadius: "20px",
            border: "1px solid #ccc",
            fontSize: "14px",
            outline: "none",
          }}
        />

        <ChatMessages
          messages={messages}
          searchTerm={searchTerm}
          messagesEndRef={messagesEndRef}
        />

        <ChatInput text={text} onChange={setText} onSend={handleSend} />
      </div>
    </div>
  );
}

export default Chat;
