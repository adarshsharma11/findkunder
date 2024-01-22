import { useState } from "react";
import TextField from "@mui/material/TextField";
import AddContact from "../modal/AddCustomer";
import AddCompany from "../modal/AddCompany";
import Autocomplete from "@mui/material/Autocomplete";
import { Controller, useFormContext } from "react-hook-form";

function BasicInfoTab(props) {
  const methods = useFormContext();
  const { companies, contacts } = props;
  const { control, formState, setValue, trigger } = methods;
  const [invalidContact, setInvalidContact] = useState(false);
  const [invalidCompany, setInvalidCompany] = useState(false);
  const { errors } = formState;

  const handleAutocompleteChange = (event, newValue) => {
    // Check if the entered value is not present in the available contacts
    const isValid = contacts.some((contact) => contact.id === newValue?.id);
    if (isValid) {
      setInvalidContact(false);
    } else {
      setInvalidContact(true);
    }
    // Set the value in the form state
    setValue("person_id", newValue?.id || null, { shouldDirty: true });
    trigger("person_id");
  };

  const handleCompanyAutocompleteChange = (event, newValue) => {
    // Check if the entered value is not present in the available contacts
    const isValid = companies.some((company) => company.id === newValue?.id);
    if (isValid) {
      setInvalidCompany(false);
    } else {
      setInvalidCompany(true);
    }
    // Set the value in the form state
    setValue("company_id", newValue?.id || null, { shouldDirty: true });
    trigger("company_id");
  };

  return (
    <div className="flex justify-between w-full space-x-8">
      <div className="w-full">
        <Controller
          name="company_id"
          control={control}
          defaultValue={[]}
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              className="mt-8 mb-16"
              //freeSolo
              options={companies || []}
              getOptionLabel={(company) => `${company.company_name}`}
              value={companies.find((company) => company.id === value) || null}
              onChange={handleCompanyAutocompleteChange}
              renderInput={(params) => (
                <>
                  <TextField
                    {...params}
                    id="company_id"
                    error={!!errors.company_id}
                    required
                    helperText={errors?.company_id?.message}
                    placeholder="Select company"
                    label="Select Company"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <AddCompany
                    invalidCompany={invalidCompany}
                    setInvalidCompany={setInvalidCompany}
                  />
                </>
              )}
            />
          )}
        />
        <Controller
          name="notes"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8 mb-16"
              id="notes"
              multiline
              rows={8}
              error={!!errors.notes}
              helperText={errors?.notes?.message}
              label="Notes"
              type="text"
              variant="outlined"
              fullWidth
            />
          )}
        />
      </div>
      <div className="w-full">
        <Controller
          name="person_id"
          control={control}
          defaultValue={[]}
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              className="mt-8 mb-16"
              // freeSolo
              options={contacts || []}
              getOptionLabel={(contact) =>
                `${contact.first_name} ${contact.last_name}`
              }
              value={contacts.find((contact) => contact.id === value) || null}
              onChange={handleAutocompleteChange}
              renderInput={(params) => (
                <>
                  <TextField
                    {...params}
                    id="person_id"
                    error={!!errors.person_id}
                    required
                    helperText={errors?.person_id?.message}
                    placeholder="Select contact"
                    label="Select Contact"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <AddContact
                    setInvalidContact={setInvalidContact}
                    invalidContact={invalidContact}
                  />
                </>
              )}
            />
          )}
        />
      </div>
    </div>
  );
}

export default BasicInfoTab;
