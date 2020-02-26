import { useState, useEffect } from "react";
import { api } from "../../../service/api";

export const useProvider = id => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    api
      .get("/provider", {
        params: {
          id
        },
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(({ data }) => {
        console.log(data);

        setData({
          ...data
        });
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return {
    data,
    loading,
    error
  };
};
