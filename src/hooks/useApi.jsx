// src/hooks/useApi.jsx
import { useState } from "react";

const useApi = (apiFunc) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const request = async (...args) => {
    setLoading(true);
    const response = await apiFunc(...args);
    setLoading(false);

    if (!response.ok) {
      setError(true);
      return response;
    }

    setError(false);
    setData(response.data);
    return response;
  };

  return { data, error, loading, request };
};

export default useApi;