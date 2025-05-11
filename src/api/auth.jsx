// src/api/auth.js
import client from "./client";

const login = async (email, password) => {
  try {
    const response = await client.post("/auth/login", { email, password });
    return {
      ok: true,
      data: response.data, // Contient { data: { token, user } }
    };
  } catch (error) {
    return {
      ok: false,
      data: error.response?.data || null,
    };
  }
};

export default {
  login,
};