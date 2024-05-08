import React, { createContext, useContext, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getProducts as getLocations } from './main/pages/customer-locations/store/customerLocationsSlice';
import { getProducts as getCustomerTypes } from './main/pages/customer-types/store/customerTypesSlice';
import { getProducts as getCategories } from './main/pages/categories/store/categoriesSlice';

const StepperContext = createContext();

export const StepperProvider = ({ children }) => {
  const [data, setData] = useState({
    locations: [],
    customerTypes: [],
    customerCategories: [],
  });
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(() => {
    try {
      const savedStep = localStorage.getItem('activeStep');
      return savedStep ? JSON.parse(savedStep) : 0;
    } catch (error) {
      console.error('Error parsing activeStep from localStorage:', error);
      return 0;
    }
  });

  // Update localStorage whenever activeStep changes
  useEffect(() => {
    try {
      localStorage.setItem('activeStep', JSON.stringify(activeStep));
    } catch (error) {
      console.error('Error saving activeStep to localStorage:', error);
    }
  }, [activeStep]);

  useEffect(() => {
    // Dispatch the getProducts action and handle the response
    dispatch(getLocations())
      .then((response) => {
        if (response.meta.requestStatus === "fulfilled") {
          setData(prevData => ({
            ...prevData,
            locations: response.payload
          }));
        } else {
          // Handle error if needed
          console.error("Error fetching locations:", response.error);
        }
      })
      .finally(() => {});
  }, [dispatch]);

  useEffect(() => {
    // Dispatch the getProducts action and handle the response
    dispatch(getCustomerTypes())
      .then((response) => {
        if (response.meta.requestStatus === "fulfilled") {
          setData(prevData => ({
            ...prevData,
            customerTypes: response.payload
          }));
        } else {
          // Handle error if needed
          console.error("Error fetching locations:", response.error);
        }
      })
      .finally(() => {});
  }, [dispatch]);

  useEffect(() => {
    // Dispatch the getProducts action and handle the response
    dispatch(getCategories())
      .then((response) => {
        if (response.meta.requestStatus === "fulfilled") {
          setData(prevData => ({
            ...prevData,
            customerCategories: response.payload
          }));
        } else {
          // Handle error if needed
          console.error("Error fetching locations:", response.error);
        }
      })
      .finally(() => {});
  }, [dispatch]);

  return (
    <StepperContext.Provider value={{ activeStep, setActiveStep, data }}>
      {children}
    </StepperContext.Provider>
  );
};

export const useStepper = () => {
  const context = useContext(StepperContext);
  if (!context) {
    throw new Error('useStepper must be used within a StepperProvider');
  }
  return context;
};
