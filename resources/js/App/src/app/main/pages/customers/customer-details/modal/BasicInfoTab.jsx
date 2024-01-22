import TextField from "@mui/material/TextField";
import { Controller, useFormContext } from "react-hook-form";
import Autocomplete from "@mui/material/Autocomplete";
function BasicInfoTab(props) {
  const methods = useFormContext();
  const { companies, contacts } = props;
  const { control, formState, trigger, setValue } = methods;
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
    <div className="flex justify-between">
      <div className="flex-col w-full">
        <div className="w-4/5">
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
                value={
                  companies.find((company) => company.id === value) || null
                }
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
                  </>
                )}
              />
            )}
          />
          <div className="mt-64">
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
                  value={
                    contacts.find((contact) => contact.id === value) || null
                  }
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
                    </>
                  )}
                />
              )}
            />
          </div>
        </div>
      </div>
      <div className="flex-col w-full">
        <div className="mt-12">
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
      </div>
    </div>
  );
}

export default BasicInfoTab;
