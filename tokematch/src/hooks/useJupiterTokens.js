import { useEffect, useState } from 'react';

export const useJupiterTokens = () => {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const res = await fetch('https://lite-api.jup.ag/tokens/v1/tagged/lst');
        const data = await res.json();
        console.log('Loaded trending Jupiter tokens:', data);
        setTokens(data.slice(0, 20)); // Limit for swipe view
      } catch (err) {
        console.error('Failed to fetch trending tokens', err);
      }
    };
    fetchTokens();
  }, []);

  return tokens;
};