import React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { yupResolver } from "@hookform/resolvers/yup";
import { useStepper } from '../../InquiryContext';
import { makeStyles } from '@mui/styles';
import { useForm, FormProvider } from 'react-hook-form';
import ContactInfo from './form-steps/Contact';
import AdditionalInfo from './form-steps/AdditionalInfo';
import CompanyInfo from './form-steps/Company';
import { inquiryContactSchema, inquiryCompanySchema, additionalInfoSchema } from '../../schemas/validationSchemas';

const useStyles = makeStyles((theme) => ({
  formFields: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
}));


export default function InquiryStepForm() {
  const { activeStep, setActiveStep } = useStepper();
  const schema = activeStep === 0 ? inquiryContactSchema : activeStep === 1 ? inquiryCompanySchema : additionalInfoSchema;
  const methods = useForm({
    mode: "onChange",
    defaultValues: {},
    resolver: yupResolver(schema),
  });
  const { reset, watch, control, onChange, formState } = methods;
  const { errors, isValid } = formState;
  const form = watch();
  const classes = useStyles();

  const steps = ['Contact', 'Company', 'Additional information'];

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    // Implement your logic to check if step is skipped
    return false;
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    // Implement your logic to skip step
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
      {steps.map((label, index) => {
          const stepProps = { completed: false };
          const labelProps= {
            optional: false
          };
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === 0 && <FormProvider {...methods}> <div className='mt-16 mb-8'> <ContactInfo /> </div> </FormProvider>}
      {activeStep === 1 && <FormProvider {...methods}> <div className='mt-16 mb-8'> <CompanyInfo /> </div> </FormProvider>}
      {activeStep === 2 && <FormProvider {...methods}> <div className='mt-16 mb-8'> <AdditionalInfo /> </div> </FormProvider>}
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}
            <Button onClick={handleNext} disabled={!isValid}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
