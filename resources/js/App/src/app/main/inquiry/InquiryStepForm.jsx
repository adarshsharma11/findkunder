import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
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
import { useDispatch } from 'react-redux';
import { getProducts as getCategories } from '../pages/categories/store/categoriesSlice';
import { getProducts as getCustomerTypes } from '../pages/customer-types/store/customerTypesSlice';
import { getProducts as getLocations } from '../pages/customer-locations/store/customerLocationsSlice';
import { addNewLead } from '../pages/leads/store/leadSlice';
import { inquiryContactSchema, inquiryCompanySchema, additionalInfoSchema } from '../../schemas/validationSchemas';
import { INITIAL_INQUIRY_DATA } from '../../InquiryContext';
import _ from "@lodash";

const defaultValues = {
  contact_name: '',
  contact_email: '',
  contact_phone: '',
  company_name: '',
  cvr_number: '',
  street: '',
  postal_code: '',
  categories: [],
  city: '',
  location_id: '',
  website: '',
  customer_type_id: '',
  company_description: '',
  who_do_you_need: '',
  specific_preferences: '',
  physical_attendance_required: '',
  physical_attendance_details: '',
  do_not_contact: '',
  attachments_per_year: null,
  employees_count: null,
};


const useStyles = makeStyles((theme) => ({
  formFields: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
}));


export default function InquiryStepForm() {
  const { activeStep, setActiveStep, formData, setFormData } = useStepper();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    locations: [],
    customerTypes: [],
    customerCategories: [],
  });
  const { locations, customerTypes, customerCategories } = data;
  const schema = [inquiryContactSchema, inquiryCompanySchema, additionalInfoSchema][activeStep];

  const methods = useForm({
    mode: "onTouched",
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { reset, watch, control, onChange, formState, handleSubmit, getValues } = methods;
  const { errors, isValid, dirtyFields } = formState;
  const form = watch();
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false); 

  const steps = ['Contact', 'Company', 'Additional information'];

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

  const isStepSkipped = (step) => {
    return false;
  };

  const handleNext = () => {
    setFormData(prevData => ({
      ...prevData,
      ...getValues(),
    }));
    if (activeStep === steps.length - 1) {
      handleSubmit(onSubmit)();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };
  

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setFormData(INITIAL_INQUIRY_DATA);
    reset(INITIAL_INQUIRY_DATA);
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await dispatch(addNewLead(formData));
      if (response.payload) {
        await localStorage.removeItem('inquiry-data');
        setFormData(INITIAL_INQUIRY_DATA);
        setTimeout(() => {
          setActiveStep(steps.length);
        }, 1000);  
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
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
      <FormProvider {...methods}>
        {activeStep === 0 && <div className='mt-16 mb-8'> <ContactInfo /> </div>}
        {activeStep === 1 && <div className='mt-16 mb-8'> <CompanyInfo locations={locations} customerTypes={customerTypes} /> </div>}
        {activeStep === 2 && <div className='mt-16 mb-8'> <AdditionalInfo customerCategories={customerCategories}/> </div>}
      </FormProvider>
      {activeStep === steps.length ? (
        <React.Fragment>
        <div className="bg-green-100 rounded-md p-8 mb-4 mt-16">
            <p className="text-lg font-semibold mb-2">Thank you for your message.</p>
            <p className="mb-8">
              We will now look through your inquiry and find the bookkeepers who best match your wishes and needs. If we need further information, we will contact you. If not, you will be contacted by the bookkeeper(s) that we believe are relevant to you.
            </p>
            <p className="font-semibold mb-8">With best regards,</p>
            <p>Find bogholder/revisor</p>
        </div>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Restart</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            {activeStep !== 0 && 
              <Button
                color="primary"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
                variant="outlined"
                >
                Back
              </Button>
            }
            <Box sx={{ flex: '1 1 auto' }} />
            <Box sx={{ m: 1, position: 'relative' }}>
            <Button onClick={handleNext} color="secondary" disabled={_.isEmpty(dirtyFields) || !isValid || isLoading}  endIcon={isLoading && <CircularProgress size={20}/>} variant="outlined" >
              {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
            </Button>
          </Box>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
