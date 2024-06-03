import React, { createContext, useContext, useEffect, useState } from 'react';
import AuthService from './auth/services/AuthService';

const CustomersCountContext = createContext();

export const CustomersCountProvider = ({ children }) => {
  const [customersCount, setCustomersCount] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AuthService.getCustomersCount()
      .then(response => {
        setCustomersCount(response.data.profileCount);
      })
      .catch(error => {
        console.error('Error fetching customers count:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <CustomersCountContext.Provider value={{ customersCount, isLoading }}>
      {children}
    </CustomersCountContext.Provider>
  );
};

export const useCustomersCount = () => {
  return useContext(CustomersCountContext);
};
