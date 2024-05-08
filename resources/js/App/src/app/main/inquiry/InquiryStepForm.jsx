import React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import { yupResolver } from "@hookform/resolvers/yup";
import { useStepper } from '../../InquiryContext';
import { makeStyles } from '@mui/styles';
import { useForm, FormProvider } from 'react-hook-form';
import ContactInfo from './form-steps/Contact';
import AdditionalInfo from './form-steps/AdditionalInfo';
import CompanyInfo from './form-steps/Company';
import { inquiryContactSchema, inquiryCompanySchema, additionalInfoSchema } from '../../schemas/validationSchemas';
import _ from "@lodash";

const defaultValuesForContact = {
  contact_name: "",
  contact_email: "",
  contact_phone: ""
};

const defaultValuesForCompany = {
  companyName: "",
  cvrNumber: "",
  street: "",
  postalCode: "",
  city: "",
  location: "",
  customerType: "",
  companyDescription: ""
};

const defaultValuesForAdditionalInfo = {
  whoDoYouNeed: "",
  whatDoYouNeedHelpFor: "",
  specificPreferences: "",
  physicalAttendance: "",
  physicalAttendanceDetails: "",
  doNotContact: ""
};


const useStyles = makeStyles((theme) => ({
  formFields: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
}));


export default function InquiryStepForm() {
  const { activeStep, setActiveStep, data } = useStepper();
  const { locations, customerTypes, customerCategories } = data;
  const schema = activeStep === 0 ? inquiryContactSchema : activeStep === 1 ? inquiryCompanySchema : additionalInfoSchema;
  const defaultValues = activeStep === 0 ? defaultValuesForContact : activeStep === 1 ? defaultValuesForCompany : defaultValuesForAdditionalInfo;
  const methods = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { reset, watch, control, onChange, formState } = methods;
  const { errors, isValid, dirtyFields } = formState;
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
      {activeStep === 1 && <FormProvider {...methods}> <div className='mt-16 mb-8'> <CompanyInfo locations={locations} customerTypes={customerTypes} /> </div> </FormProvider>}
      {activeStep === 2 && <FormProvider {...methods}> <div className='mt-16 mb-8'> <AdditionalInfo customerCategories={customerCategories}/> </div> </FormProvider>}
      {activeStep === steps.length ? (
        <React.Fragment>
        <div className="bg-green-100 rounded-md p-8 mb-4 mt-16">
            <p className="text-lg font-semibold mb-2">Thank you for your message.</p>
            <p className="mb-8">
              We will now look through your inquiry and find the bookkeepers who best match your wishes and needs. If we need further information, we will contact you. If not, you will be contacted by the bookkeeper(s) that we believe are relevant to you.
            </p>
            <p className="font-semibold mb-8">With best regards,</p>
            <p>Findkunder.dk</p>
        </div>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Restart</Button>
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
            <Button onClick={handleNext} disabled={_.isEmpty(dirtyFields) || !isValid}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
