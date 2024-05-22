import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import { yupResolver } from "@hookform/resolvers/yup";
import { useStepper } from '../../InquiryContext';
import { blue } from '@mui/material/colors';
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
import _ from "@lodash";

const defaultValuesForContact = {
  contact_name: "",
  contact_email: "",
  contact_phone: ""
};

const defaultValuesForCompany = {
  company_name: "",
  cvrNumber: "",
  street: "",
  postal_code: "",
  city: "",
  location_id: "",
  customer_type_id: "",
  companyDescription: "",
  website: "",
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
  const { activeStep, setActiveStep, formData, setFormData } = useStepper();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    locations: [],
    customerTypes: [],
    customerCategories: [],
  });
  const { locations, customerTypes, customerCategories } = data;
  const schema = activeStep === 0 ? inquiryContactSchema : activeStep === 1 ? inquiryCompanySchema : additionalInfoSchema;
  const defaultValues = activeStep === 0 ? defaultValuesForContact : activeStep === 1 ? defaultValuesForCompany : defaultValuesForAdditionalInfo;
  const methods = useForm({
    mode: "onChange",
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
    if (activeStep === steps.length - 1) {
      handleSubmit(onSubmit)();
    } else {
      const updatedFormData = { ...formData, ...getValues() };
      setFormData(updatedFormData);
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };
  

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const onSubmit = async (data) => {
    setIsLoading(true); // Set loading to true when form is submitted
    try {
      const response = await dispatch(addNewLead(formData));
      console.log(response, 'jkbchjbcdb');
      setActiveStep(3);
      console.log("Form submitted successfully:", formData);
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
            <Box sx={{ m: 1, position: 'relative' }}>
            <Button onClick={handleNext} disabled={_.isEmpty(dirtyFields) || !isValid || isLoading}>
              {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
            </Button>
            {isLoading && (
              <CircularProgress
                size={24}
                sx={{
                  color: blue[500],
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-12px',
                  marginLeft: '-12px',
                }}
              />
            )}
          </Box>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
