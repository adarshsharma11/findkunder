import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import LocationStep from './form-steps/Location';
import ContactStep from './form-steps/Contact';
import AccountStep from './form-steps/AccountStep';
import { companySchema, contactSchema } from '../../schemas/validationSchemas';

const defaultValues = {
  company_name: '',
  cvr: '',
  street: '',
  postal_code: '',
  city: '',
  location: '',
  website: '',
  linkedin: '',
  facebook: '',
  first_name: '',
  title: '',
  last_name: '',
  email: '',
  phone: '',
  comment: '',
  password: '',
  accountEmail: ''
};

// Validation schemas

const accountSchema = yup.object().shape({
  accountEmail: yup.string().required("You must enter a email")
  .email("Invalid email format")
  .max(255, "Email must not exceed 255 characters"),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const steps = ['Location', 'Contact', 'Create an account or login'];

const AddProfileStepForm = () => {
  const [activeStep, setActiveStep] = useState(0);

  const validationSchemas = [companySchema, contactSchema, accountSchema];

  const methods = useForm({
    resolver: yupResolver(validationSchemas[activeStep]),
    mode: 'onTouched',
    defaultValues,
  });

  const handleNext = async () => {
    const isValid = await methods.trigger();
    if (isValid) {
      if (activeStep < steps.length - 1) {
        setActiveStep((prevStep) => prevStep + 1);
      } else {
        // Submit the form
        console.log(methods.getValues());
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  return (
    <FormProvider {...methods}>
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box sx={{ mt: 2 }}>
          {activeStep === 0 && <LocationStep />}
          {activeStep === 1 && <ContactStep />}
          {activeStep === 2 && <AccountStep />}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            {activeStep > 0 && (
              <Button onClick={handleBack} sx={{ mr: 1 }}>
                Back
              </Button>
            )}
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </Box>
      </Box>
    </FormProvider>
  );
};

export default AddProfileStepForm;
