import { useState, useEffect } from 'react';
import axios from 'axios';

const useGetNews = (API) => {
  const [news, setNews] = useState([]);

  useEffect(async () => {
    const response = await axios(`${API}/noticias`);
    setNews(response.data);
  }, []);

  return news;
};

export default useGetNews;
