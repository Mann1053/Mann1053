import { useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";
import { handleApiError } from "@/utils/apiErrorHandler";

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const router = useRouter();

  const callApi = async (method, url, body = null, config = {}) => {
    setLoading(true);
    setError(null);
    setData(null);

    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const finalURL = `${API_URL}${url}`;

    try {
      const requestConfig = {
        method,
        url: finalURL,
        ...config,
      };

      if (method.toLowerCase() !== 'delete' && body !== null) {
        requestConfig.data = body;
      }

      const response = await axiosInstance(requestConfig);

      setData(response.data);
      return response.data;
    } catch (err) {
      // Handle all errors with common error handler
      const errorInfo = handleApiError(err);
      setError(errorInfo.message);

      // Note: Users stay on the same page when errors occur
      // The error toast is displayed automatically by handleApiError
      return errorInfo;
    } finally {
      setLoading(false);
    }
  };

  return { callApi, loading, error, data };
};

export default useApi;
