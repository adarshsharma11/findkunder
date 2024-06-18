import TextField from "@mui/material/TextField";
import { Controller, useFormContext } from "react-hook-form";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Autocomplete from "@mui/material/Autocomplete";
function BasicInfoTab(props) {
  const methods = useFormContext();
  const { companies, contacts, isAdmin } = props;
  const { control, formState } = methods;
  const { errors } = formState;

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
                options={companies || []}
                getOptionLabel={(company) => `${company.company_name}`}
                value={
                  companies?.find((company) => company?.id === value) || ""
                }
                onChange={(event, newValue) => {
                  onChange(newValue?.id);
                }}
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
        {isAdmin &&
         <>
         <InputLabel id="status-label">Status</InputLabel>
         <Controller
           name="status"
           control={control}
           render={({ field }) => (
             <Select
               {...field}
               labelId="status-label"
               id="status"
               className="mt-8 mb-16"
               error={!!errors.status}
               helperText={errors?.status?.message}
               required
               displayEmpty
               variant="outlined"
               fullWidth
             >
               <MenuItem value="" disabled>Select Status</MenuItem>
               <MenuItem value="3">High Priority</MenuItem>
               <MenuItem value="2">Medium Priority</MenuItem>
               <MenuItem value="1">Low Priority</MenuItem>
               <MenuItem value="0">No Priority</MenuItem>
             </Select>
           )}
         />
         </>
        }
          <div className={isAdmin ? 'mt-8' : 'mt-64'}>
            <Controller
              name="person_id"
              control={control}
              defaultValue={[]}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  className="mt-8 mb-16"
                  options={contacts || []}
                  getOptionLabel={(contact) =>
                    `${contact.first_name} ${contact.last_name}`
                  }
                  value={
                    contacts?.find((contact) => contact?.id === value) || ""
                  }
                  onChange={(event, newValue) => {
                    if (typeof newValue !== "string") {
                      onChange(newValue?.id);
                    }
                  }}
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
        <div>
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
