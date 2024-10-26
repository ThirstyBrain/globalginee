import { useState, useEffect } from 'react';

interface IfscData {
  ifsc: string;
  BANK: string;
  BRANCH: string;
  ADDRESS: string;
  CITY: string;
  DISTRICT: string;
  STATE: string;
}

const useFetchIfsc = (ifscCode: string) => {
  const [data, setData] = useState<IfscData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  //const BASE_URL = 'https://ifsc.razorpay.com/';

  useEffect(() => {
    if (!ifscCode) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`https://ifsc.razorpay.com/${ifscCode}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result: IfscData = await response.json();
        setData(result);
      } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
          } else {
            setError('An unknown error occurred');
          }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [ifscCode]);

  return { data, loading, error };
};

export default useFetchIfsc;
