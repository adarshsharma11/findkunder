import React, { createContext, useContext, useState, useEffect } from 'react';

export const INITIAL_INQUIRY_DATA = {
  contact_name: '',
  contact_email: '',
  contact_phone: '',
  company_name: '',
  cvr_number: '',
  street: '',
  postal_code: '',
  city: '',
  location_id: '',
  customer_type_id: '',
  company_description: '',
  website: '',
  who_do_you_need: '',
  specific_preferences: '',
  physical_attendance_required: '',
  physical_attendance_details: '',
  do_not_contact: '',
  categories: '',
};

const StepperContext = createContext();

export const StepperProvider = ({ children }) => {
  const [formData, setFormData] = useState(INITIAL_INQUIRY_DATA);
  const [activeStep, setActiveStep] = useState(() => {
    try {
      const savedStep = localStorage.getItem('activeStep');
      return savedStep ? JSON.parse(savedStep) : 0;
    } catch (error) {
      console.error('Error parsing activeStep from localStorage:', error);
      return 0;
    }
  });

  useEffect(() => {
    const fetchSavedInquiry = () => {
      const savedInquiry = localStorage.getItem('inquiry-data');
      if (savedInquiry) {
        setFormData(JSON.parse(savedInquiry));
      }
    };
    fetchSavedInquiry();
  }, []);

  useEffect(() => {
    localStorage.setItem('inquiry-data', JSON.stringify(formData));
  }, [formData]);

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
