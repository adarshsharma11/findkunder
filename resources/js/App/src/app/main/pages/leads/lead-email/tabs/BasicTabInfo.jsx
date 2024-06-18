import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showMessage } from "app/store/fuse/messageSlice";

function BasicInfoTab(props) {
  const { updateAssignLeads, leadId, assignedCustomers, status } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const methods = useFormContext();
  const [loading, setLoading] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

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

  const onSubmit = async (data) => {
    setLoadingSubmit(true);
    try {
      const params = {
        assigned_customers,
        lead_id: leadId,
        status,
        body: data?.body,
        subject: data?.subject,
      };
      await assignLead(params);
    } catch (error) {
      dispatch(showMessage({ message: "Failed to send email", variant: "error" }));
    } finally {
      setLoadingSubmit(false);
    }
  };

  const handleSkipAndAssign = async () => {
    setLoading(true);
    try {
      const params = {
        assigned_customers,
        lead_id: leadId,
        status,
      };
      await assignLead(params);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Typography variant="h6">Compose Email</Typography>
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
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2, width: '28%' }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleSkipAndAssign}
          disabled={loading}
          endIcon={loading && <CircularProgress size={20} />}
        >
          Skip and Assign
        </Button>
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
