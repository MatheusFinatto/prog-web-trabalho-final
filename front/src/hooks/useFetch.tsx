import { useState } from "react";
import { todoType } from "../pages/TodoList/Main";

const useFetch = () => {
  const [data, setData] = useState<todoType[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async (
    url: string,
    method = "GET",
    body: null | string | todoType = null
  ) => {
    setLoading(true);

    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : null,
    };
    try {
      const response = await fetch(url, options);

      const responseData = await response.json();

      setData(responseData);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, fetchData };
};

export default useFetch;
