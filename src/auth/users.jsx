import apiClient from "@/api/client";


const register = (userInfo) => apiClient.post("/users", userInfo);

export default { register };
