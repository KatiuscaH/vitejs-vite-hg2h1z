import { useEffect, useState } from 'react';
const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export const useFetchData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    setLoading(true);
    fetch(API_URL, { signal })
      .then((res) => {
        return res.json();
        console.log(res);
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((error) => {
        if (error.name !== 'AbortError') {
          console.error(error.message);
        }
      });
    return () => controller.abort();
  }, []);
  return { data, loading };
};
