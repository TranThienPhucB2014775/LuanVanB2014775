import { useCallback, useEffect, useState } from "react";

export default function useHttp(fetch, initData) {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState();
  const [data, setData] = useState(initData);

  const sendRequest = async function sendRequest(data) {
    setIsLoading(true);
    try {
      const res = await fetch({ ...data });
      setData(res.result);
    } catch (error) {
      setError(error.message || "Something went wrong");
    }
    setIsLoading(false);
  };

  return {
    data,
    error,
    isLoading,
    sendRequest,
  };
}
