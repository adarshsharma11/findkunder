import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showMessage } from "app/store/fuse/messageSlice";
import { formatCategories } from '../../../../../utils/categoryHelpers';

const inProgress = '1';

function BasicInfoTab(props) {
  const { updateAssignLeads, leadId, assignedCustomers, data } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const methods = useFormContext();
  console.log(data, 'asfsaasvas');
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [selectedFields, setSelectedFields] = useState([]);
  const formattedCategories = data.categories && formatCategories(data.categories);

  const { handleSubmit, control, formState } = methods;
  const assigned_customers = assignedCustomers ? assignedCustomers.split(',').map(Number) : [];

  const assignLead = async (params) => {
    try {
      await updateAssignLeads(params);
      dispatch(showMessage({ message: "Lead assigned successfully!" }));
      navigate(`/leads/${leadId}`);
    } catch (error) {
      dispatch(showMessage({ message: "Failed to assign lead", variant: "error" }));
    }
  };

  const onSubmit = async (formData) => {
    setLoadingSubmit(true);
    try {
      const selectedData = {
        ...data,
      };

      const params = {
        assigned_customers,
        lead_id: leadId,
        status: inProgress,
        body: formData?.body,
        subject: formData?.subject,
        selectedData,
        selectedFields,
      };
     await assignLead(params);
    } catch (error) {
      dispatch(showMessage({ message: "Failed to send email", variant: "error" }));
    } finally {
      setLoadingSubmit(false);
    }
  };

  const handleCheckboxChange = (field) => {
    setSelectedFields((prevFields) =>
      prevFields.includes(field)
        ? prevFields.filter((f) => f !== field)
        : [...prevFields, field]
    );
  };

  const renderCheckbox = (label, field, value) => (
    <FormControlLabel
      control={
        <Checkbox
          checked={selectedFields.includes(field)}
          onChange={() => handleCheckboxChange(field)}
        />
      }
      label={`${label}: ${value || "N/A"}`}
    />
  );

  const renderCategories = () => {
    const formattedLabel = formattedCategories.length > 0
      ? formattedCategories.map(category => {
          const categoryName = category.name;
          const subcategories = category.subcategories.length > 0
            ? ` (${category.subcategories.map(sub => sub.name).join(', ')})`
            : '';
          return `${categoryName}${subcategories}`;
        }).join(', ')
      : 'N/A';
  
    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={selectedFields.includes("categories")}
            onChange={() => handleCheckboxChange("categories")}
          />
        }
        label={`What do you need help for: ${formattedLabel}`}
      />
    );
  };
  


  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Typography variant="h5">Compose Email</Typography>
      <Controller
        name="subject"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Subject"
            variant="outlined"
            fullWidth
            error={!!formState.errors.subject}
            helperText={formState.errors.subject?.message}
          />
        )}
      />
      <Controller
        name="body"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Body"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            error={!!formState.errors.body}
            helperText={formState.errors.body?.message}
          />
        )}
      />
      <Box sx={{ display: "flex", flexDirection: "row", gap: 1, justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography variant="h6">CONTACT</Typography>
          {renderCheckbox("Contact name", "contact_name", data.contact_name)}
          {renderCheckbox("Contact email", "contact_email", data.contact_email)}
          {renderCheckbox("Contact phone", "contact_phone", data.contact_phone)}
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography variant="h6">COMPANY</Typography>
          {renderCheckbox("Company name", "company_name", data.company_name)}
          {renderCheckbox("Tell us a bit about your company", "company_description", data.company_description)}
          {renderCheckbox("Website", "website", data.website)}
          {renderCheckbox("CVR number", "cvr_number", data.cvr_number)}
          {renderCheckbox("Who are you", "who_are_you", data?.customer_type?.name)}
          {renderCheckbox("Street", "street", data.street)}
          {renderCheckbox("Postal code", "postal_code", data.postal_code)}
          {renderCheckbox("City", "city", data.city)}
          {renderCheckbox("Your location", "location.name", data.location?.name)}
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography variant="h6">ADDITIONAL INFORMATION</Typography>
          {renderCheckbox("Who do you need", "who_do_you_need", data.who_do_you_need)}
          {renderCategories()}
          {renderCheckbox("Do you have any specific preferences", "specific_preferences", data.specific_preferences)}
          {renderCheckbox("Is physical attendance required", "physical_attendance_required", data.physical_attendance_required)}
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2, width: '28%' }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loadingSubmit}
          endIcon={loadingSubmit && <CircularProgress size={20} />}
        >
          Send and Assign
        </Button>
      </Box>
    </Box>
  );
}

export default BasicInfoTab;
