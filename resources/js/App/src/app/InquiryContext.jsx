import React, { createContext, useContext, useState, useEffect } from 'react';

const StepperContext = createContext();

export const StepperProvider = ({ children }) => {
  const [formData, setFormData] = useState({});
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


  return (
    <StepperContext.Provider value={{ activeStep, setActiveStep, formData,  setFormData}}>
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
