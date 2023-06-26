import { useState } from "react";
import { dbType } from "../pages/TodoList/Main";

const useFetch = () => {
  const [data, setData] = useState<dbType[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async (url: string, method = "GET", body = null) => {
    setLoading(true);

    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : null,
    };

    const response = await fetch(url, options);

    const responseData = await response.json();

    setData(responseData);

    setLoading(false);
  };

  return { data, loading, fetchData };
};

export default useFetch;
