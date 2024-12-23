import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Controller, useFormContext } from "react-hook-form";
import { validateNumberInput } from '../../../../../schemas/validationRulesSchemas';

function BasicInfoTab(props) {
  const { product, isAdmin, companies } = props;
  const methods = useFormContext();
  const { control, formState } = methods;
  const { errors } = formState;

  return (
    <div>
       {isAdmin && product?.user && (
        <Controller
          name="user_email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8 mb-16"
              id="user_email"
              label="User"
              InputProps={{
                readOnly: true,
              }}
              value={product.user?.email || ''}
              variant="outlined"
              fullWidth
            />
          )}
        />
      )}
        <Controller
          name="company_id"
          control={control}
          render={({ field }) => (
            <>
              <FormControl sx={{ width: '100%'}}  error={!!errors.company_id}>
              <InputLabel id="location_id">Select Company</InputLabel>
              <Select
                {...field}
                required
                className="mt-8 mb-16"
                labelId="company_id"
                id="company_id"
                variant="outlined"
                input={<OutlinedInput label="Select Company"/>}
                fullWidth
                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem value="" disabled>
                  Select Company
                </MenuItem>
                {companies &&
                  companies?.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.company_name}
                    </MenuItem>
                  ))}
              </Select>
              {errors.company_id && 
                <FormHelperText>{errors?.company_id?.message}</FormHelperText>
              }
              </FormControl>
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
        rules={{ validate: validateNumberInput }}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            id="postal_code"
            required
            error={!!errors.postal_code}
            helperText={errors?.postal_code?.message}
            label="Postal Code"
            type="text"
            variant="outlined"
            fullWidth
            onChange={(e) => {
              const { value } = e.target;
              if (/^\d*$/.test(value)) {
                field.onChange(value);
              }
            }}
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
      
    </div>
  );
}

export default BasicInfoTab;
