import React, { createContext, useContext, useEffect, useState } from 'react';
import AuthService from './auth/services/AuthService';
import { useAuth } from './auth/AuthContext';

const CustomersCountContext = createContext();

export const CustomersCountProvider = ({ children }) => {
  const { isAuthenticated } = useAuth(); 
  const [customersCount, setCustomersCount] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getCustomerCount = () => {
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
  }

  useEffect(() => {
   if (!isAuthenticated) {
    getCustomerCount();
   }
  }, [isAuthenticated]);

  return (
    <CustomersCountContext.Provider value={{ customersCount, isLoading }}>
      {children}
    </CustomersCountContext.Provider>
  );
};

export const useCustomersCount = () => {
  return useContext(CustomersCountContext);
};
