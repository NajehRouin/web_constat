import { create } from "apisauce";
import cache from "../utility//cache";
import authStorage from "../auth/Storage";

const apiClient = create({
  baseURL: "http://localhost:9000/api",
});

const get = apiClient.get;

apiClient.addAsyncRequestTransform(async (request) => {
  console.log("Running request transform");
  const authToken = await authStorage.getToken();
  console.log("Auth token:", authToken);
  if (!authToken) return;
  request.headers["x-auth-token"] = authToken;
});

apiClient.get = async (url, params, axiosConfig) => {
  console.log("Sending request to:", url);
  const response = await get(url, params, axiosConfig);
  console.log("Response:", response);

  if (response.ok) {
    cache.store(url, response.data);
    return response;
  }

  const data = await cache.get(url);
  return data ? { ok: true, data } : response;
};

export default apiClient;
