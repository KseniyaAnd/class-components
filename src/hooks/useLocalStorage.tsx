import { useState, useEffect } from 'react';

const useLocalStorage = () => {
  const [searchTerm, setSearchTerm] = useState<string>(() => {
    return localStorage.getItem('searchTerm') || '';
  });

  useEffect(() => {
    return () => {
      localStorage.setItem('searchTerm', searchTerm);
    };
  }, [searchTerm]);

  return [searchTerm, setSearchTerm] as const;
};

export default useLocalStorage;
