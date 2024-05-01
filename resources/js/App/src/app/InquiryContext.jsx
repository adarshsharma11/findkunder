import React, { createContext, useContext, useState } from 'react';

const StepperContext = createContext();

export const StepperProvider = ({ children }) => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <StepperContext.Provider value={{ activeStep, setActiveStep }}>
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
