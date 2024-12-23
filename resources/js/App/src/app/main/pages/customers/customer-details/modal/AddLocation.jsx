import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm, FormProvider } from "react-hook-form";
import _ from "@lodash";
import { companySchema } from "../../../../../schemas/validationSchemas";

const AddLocation = ({
  invalidCompany,
  setInvalidCompany,
  companyName,
  handleSaveCompany,
  companies,
}) => {
  const methods = useForm({
    mode: "onChange",
    defaultValues: {},
    resolver: yupResolver(companySchema),
  });
  console.log(companies, 'ghchgcghc')
  const { control, formState, getValues, setValue } = methods;
  const { errors, isValid, dirtyFields } = formState;
  React.useEffect(() => {
    if (companyName) {
      setValue("street", companyName);
    }
  }, [companyName]);

  return (
    <>
      <Dialog open={invalidCompany} onClose={() => setInvalidCompany(false)}>
        <DialogTitle>Add Location</DialogTitle>
        <DialogContent>
          <div className="mt-12">
            <FormProvider {...methods}>
            <Controller
                name="company_name"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <>
                    <InputLabel id="demo-simple-select-label">
                      Select Company
                    </InputLabel>
                    <Select
                      {...field}
                      className="mt-8 mb-16"
                      error={!!errors.company_name}
                      required
                      displayEmpty
                      helperText={errors?.company_name?.message}
                      id="company_name"
                      variant="outlined"
                      fullWidth
                    >
                      <MenuItem value="" disabled>
                        Select Company
                      </MenuItem>
                      {companies &&
                        companies.map((company) => (
                          <MenuItem key={company.id} value={company.id}>
                            {company.company.company_name}
                          </MenuItem>
                        ))}
                    </Select>
                  </>
                )}
              />
              <Controller
                name="street"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mt-8 mb-16"
                    id="street"
                    required
                    error={!!errors.street}
                    helperText={errors?.street?.message}
                    label="Street"
                    type="text"
                    variant="outlined"
                    fullWidth
                  />
                )}
              />
              <Controller
                name="postal_code"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mt-8 mb-16"
                    id="postal_code"
                    required
                    error={!!errors.postal_code}
                    helperText={errors?.postal_code?.message}
                    label="Postal Code"
                    type="number"
                    variant="outlined"
                    fullWidth
                  />
                )}
              />
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mt-8 mb-16"
                    id="city"
                    required
                    error={!!errors.city}
                    helperText={errors?.city?.message}
                    label="City"
                    type="text"
                    variant="outlined"
                    fullWidth
                  />
                )}
              />
            </FormProvider>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setInvalidCompany(false)}
            className="whitespace-nowrap mx-4"
            variant="contained"
            color="secondary"
          >
            Close
          </Button>
          <Button
            onClick={() => handleSaveCompany(getValues())}
            className="whitespace-nowrap mx-4"
            variant="contained"
            color="secondary"
            disabled={_.isEmpty(dirtyFields) || !isValid}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddLocation;
