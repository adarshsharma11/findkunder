import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { motion } from "framer-motion";
import TextField from "@mui/material/TextField";
import { Controller, useFormContext } from "react-hook-form";
import Checkbox from "@mui/material/Checkbox";
import FormControl from '@mui/material/FormControl';
import FormControlLabel from "@mui/material/FormControlLabel";
import OutlinedInput from '@mui/material/OutlinedInput';
import { titleOptions, physicalAttendenceOptions  } from "../../../../../utils/helpers";

function LeadDetails(props) {
  const { data, locations, customerTypes, customerCategories } = props;
  const methods = useFormContext();
  const { control, formState, setValue, watch } = methods;
  const { errors } = formState;
  const [selectedCategories, setSelectedCategories] = React.useState([]);
  const preSelectedCategories = data.categories.length > 0 ? data.categories.map(category => category.id) : [];
  const isPhysicalAttendenceRequired = watch('physical_attendance_required') === 'Yes';

  React.useEffect(() => {
    // Set form values based on data
    if (data) {
    // Set categories if available
    setValue('who_do_you_need', data.who_do_you_need || '');
    setSelectedCategories(preSelectedCategories);
    setValue('categories', preSelectedCategories);
    setValue('company_description', data.company_description || '');
    setValue('physical_attendance_details', data.physical_attendance_details || '');
    }
  }, [data, setValue]);

  const container = {
    show: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="w-full">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="w-full"
      >
        <div className="md:flex">
          <div className="flex flex-col flex-1 md:ltr:pr-32 md:rtl:pl-32">
            <Card component={motion.div} variants={item} className="w-full mb-32">
              <CardContent className="px-32 py-24">
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                  <div className="mb-24">
                    <Typography className="text-2xl font-semibold leading-tight">
                    CONTACT
                    </Typography>
                    </div>
                    <div className="mb-24">
                    <Controller
                        name="contact_name"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            error={!!errors.contact_name}
                            required
                            helperText={errors?.contact_name?.message}
                            label="Contact Name"
                            autoFocus
                            id="contact_name"
                            variant="outlined"
                            fullWidth
                          />
                        )}
                      />
                    </div>
                    <div className="mb-24">
                    <Controller
                        name="contact_email"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            error={!!errors.contact_email}
                            required
                            helperText={errors?.contact_email?.message}
                            label="Contact Email"
                            autoFocus
                            id="contact_email"
                            variant="outlined"
                            fullWidth
                          />
                        )}
                      />
                    </div>
                    <div className="mb-24">
                    <Controller
                        name="contact_phone"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            error={!!errors.contact_phone}
                            required
                            helperText={errors?.contact_phone?.message}
                            label="Contact Phone"
                            autoFocus
                            id="contact_phone"
                            variant="outlined"
                            fullWidth
                          />
                        )}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} md={4}>
                  <div className="mb-24">
                    <Typography className="text-2xl font-semibold leading-tight">
                    COMPANY
                    </Typography>
                    </div>
                    <div className="mb-24">
                    <Controller
                        name="company_name"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            error={!!errors.company_name}
                            required
                            helperText={errors?.company_name?.message}
                            label="Company Name"
                            autoFocus
                            id="company_name"
                            variant="outlined"
                            fullWidth
                          />
                        )}
                      />
                    </div>
                    <div className="mb-24">
                    <Controller
                        name="company_description"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            error={!!errors.company_description}
                            helperText={errors?.company_description?.message}
                            label="Tell us a bit about your company"
                            autoFocus
                            id="company_description"
                            variant="outlined"
                            fullWidth
                          />
                        )}
                      />
                    </div>
                    <div className="mb-24">
                    <Controller
                        name="website"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            error={!!errors.website}
                            helperText={errors?.website?.message}
                            label="Website"
                            autoFocus
                            id="website"
                            variant="outlined"
                            fullWidth
                          />
                        )}
                      />
                    </div>
                    <div className="mb-24">
                    <Controller
                        name="cvr_number"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            error={!!errors.cvr_number}
                            required
                            helperText={errors?.cvr_number?.message}
                            label="CVR Number"
                            autoFocus
                            id="cvr_number"
                            variant="outlined"
                            fullWidth
                          />
                        )}
                      />
                    </div>
                    <div className="mb-24">
                    <Controller
                        name="customer_type_id"
                        control={control}
                        render={({ field }) => (
                          <>
                            <FormControl sx={{ width: '100%'}}  error={!!errors.customer_type_id}>
                            <InputLabel id="customer_type_id">Who are you</InputLabel>
                            <Select
                              {...field}
                              required
                              labelId="customer_type_id"
                              displayEmpty
                              id="customer_type_id"
                              variant="outlined"
                              input={<OutlinedInput label="Who are you"/>}
                              fullWidth
                              inputProps={{ 'aria-label': 'Without label' }}
                            >
                              <MenuItem value="" disabled>
                                Select Customer Type
                              </MenuItem>
                              {customerTypes &&
                                customerTypes?.map((option) => (
                                  <MenuItem key={option.id} value={option.id}>
                                    {option.name}
                                  </MenuItem>
                                ))}
                            </Select>
                            {errors.customer_type_id && 
                              <FormHelperText>{errors?.customer_type_id?.message}</FormHelperText>
                            }
                            </FormControl>
                          </>
                        )}
                      />
                    </div>
                    <div className="mb-24">
                    <Controller
                        name="street"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            error={!!errors.street}
                            required
                            helperText={errors?.street?.message}
                            label="Street"
                            autoFocus
                            id="street"
                            variant="outlined"
                            fullWidth
                          />
                        )}
                      />
                    </div>
                    <div className="mb-24">
                    <Controller
                        name="city"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            error={!!errors.city}
                            required
                            helperText={errors?.city?.message}
                            label="City"
                            autoFocus
                            id="city"
                            variant="outlined"
                            fullWidth
                          />
                        )}
                      />
                    </div>
                    <div className="mb-24">
                    <Controller
                        name="postal_code"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            error={!!errors.postal_code}
                            required
                            helperText={errors?.postal_code?.message}
                            label="Postal code"
                            autoFocus
                            id="postal_code"
                            variant="outlined"
                            fullWidth
                          />
                        )}
                      />
                    </div>
                    <div className="mb-24">
                    <Controller
                        name="location_id"
                        control={control}
                        render={({ field }) => (
                          <>
                            <FormControl sx={{ width: '100%'}}  error={!!errors.location_id}>
                            <InputLabel id="location_id">Your Location</InputLabel>
                            <Select
                              {...field}
                              required
                              displayEmpty
                              labelId="location_id"
                              id="location_id"
                              variant="outlined"
                              input={<OutlinedInput label="Your Location"/>}
                              fullWidth
                              inputProps={{ 'aria-label': 'Without label' }}
                            >
                              <MenuItem value="" disabled>
                                Select Location
                              </MenuItem>
                              {locations &&
                                locations?.map((option) => (
                                  <MenuItem key={option.id} value={option.id}>
                                    {option.name}
                                  </MenuItem>
                                ))}
                            </Select>
                            {errors.location && 
                              <FormHelperText>{errors?.location_id?.message}</FormHelperText>
                            }
                            </FormControl>
                          </>
                        )}
                      />
                    </div>  
                  </Grid>
                  <Grid item xs={12} md={4}>
                  <div className="mb-24">
                    <Typography className="text-2xl font-semibold leading-tight">
                    ADDITIONAL INFORMATION
                    </Typography>
                    </div>
                    <div className="mb-24">
                    <Controller
                        name="who_do_you_need"
                        control={control}
                        render={({ field }) => (
                          <>
                            <FormControl sx={{ width: '100%'}} error={!!errors.who_do_you_need}>
                            <InputLabel id="who_do_you_need">Who Do You Need</InputLabel>
                            <Select
                              {...field}
                              labelId="who_do_you_need"
                              required
                              id="who_do_you_need"
                              variant="outlined"
                              input={<OutlinedInput label="Who Do You Need"/>}
                              fullWidth
                              inputProps={{ 'aria-label': 'Without label' }}
                            >
                              <MenuItem value="" disabled>
                                Select Title
                              </MenuItem>
                              {titleOptions &&
                                titleOptions?.map((option) => (
                                  <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                  </MenuItem>
                                ))}
                            </Select>
                            {errors.who_do_you_need && 
                              <FormHelperText>{errors?.who_do_you_need?.message}</FormHelperText>
                            }
                            </FormControl>
                          </>
                        )}
                      />
                    </div>
                    <div className="mb-24">
                    <InputLabel id="categories-label">What do you need help for</InputLabel>
                      <Controller
                        name="categories"
                        control={control}
                        defaultValue={[]}
                        render={({ field: { onChange, value } }) => (
                          <div className="mt-8 mb-16">
                            {customerCategories &&
                              customerCategories?.map((category) => (
                                <div key={category.id}>
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                      onChange={(e) => {
                                        const isChecked = e.target.checked;
                                        const updatedCategories = isChecked  && !selectedCategories.includes(category.id)
                                          ? [...selectedCategories, category.id]
                                          : selectedCategories.filter(
                                              (id) => id !== category.id
                                            );
                                      
                                        setSelectedCategories(updatedCategories);
                                        onChange(updatedCategories);
                                      }}
                                      checked={selectedCategories.includes(category.id)}
                                      />
                                    }
                                    label={category.name}
                                  />
                                  {category.subcategories && selectedCategories.includes(category.id) && (
                                    <div style={{ marginLeft: 20 }}>
                                      {category.subcategories.map((sub) => (
                                        <FormControlLabel
                                          key={sub.id}
                                          control={
                                            <Checkbox
                                              onChange={(e) => {
                                                const isChecked = e.target.checked;
                                                const updatedCategories = isChecked && !selectedCategories.includes(sub.id)
                                                  ? [...selectedCategories, sub.id]
                                                  : selectedCategories.filter((id) => id !== sub.id);
                                                setSelectedCategories(updatedCategories);
                                                onChange(updatedCategories);
                                              }}
                                              checked={selectedCategories.includes(sub.id)}
                                            />
                                          }
                                          label={sub.name}
                                        />
                                      ))}
                                    </div>
                                  )}
                                </div>
                              ))}
                          </div>
                        )}
                      />
                    </div>
                    {data.attachments_per_year &&
                      <div className="mb-24">
                        <Controller
                        name="attachments_per_year"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            error={!!errors.attachments_per_year}
                            required
                            helperText={errors?.attachments_per_year?.message}
                            label="Approximately attachments per year"
                            autoFocus
                            type="number"
                            id="attachments_per_year"
                            variant="outlined"
                            fullWidth
                          />
                        )}
                      />
                      </div>
                    }
                    {data.employees_count &&
                      <div className="mb-24">
                        <Controller
                        name="employees_count"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            error={!!errors.employees_count}
                            required
                            helperText={errors?.employees_count?.message}
                            label="Approximately employees"
                            autoFocus
                            type="number"
                            id="employees_count"
                            variant="outlined"
                            fullWidth
                          />
                        )}
                      />
                    </div>
                    }
                    <div className="mb-24">
                    <Controller
                        name="specific_preferences"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            error={!!errors.specific_preferences}
                            required
                            helperText={errors?.specific_preferences?.message}
                            label="Specific Preferences"
                            autoFocus
                            id="specific_preferences"
                            variant="outlined"
                            fullWidth
                          />
                        )}
                      />
                    </div>
                    <div className="mb-24">
                    <Controller
                        name="physical_attendance_required"
                        control={control}
                        render={({ field }) => (
                          <>
                            <FormControl sx={{ width: '100%'}} error={!!errors.physical_attendance_required}>
                            <InputLabel id="physical_attendance_required">Is physical attendance required</InputLabel>
                            <Select
                              {...field}
                              labelId="physical_attendance_required"
                              required
                              id="physical_attendance_required"
                              variant="outlined"
                              input={<OutlinedInput label="Is physical attendance required"/>}
                              fullWidth
                              inputProps={{ 'aria-label': 'Without label' }}
                            >
                              <MenuItem value="" disabled>
                                Select Option
                              </MenuItem>
                              {physicalAttendenceOptions &&
                                physicalAttendenceOptions?.map((option) => (
                                  <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                  </MenuItem>
                                ))}
                            </Select>
                            {errors.physical_attendance_required && 
                              <FormHelperText>{errors?.physical_attendance_required?.message}</FormHelperText>
                            }
                            </FormControl>
                          </>
                        )}
                      />
                    </div>
                  {isPhysicalAttendenceRequired &&
                    <div className="mb-24">
                            <Controller
                            name="physical_attendance_details"
                            control={control}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                error={!!errors.physical_attendance_details}
                                required
                                helperText={errors?.physical_attendance_details?.message}
                                label="Physical Attendance Details"
                                autoFocus
                                id="physical_attendance_details"
                                variant="outlined"
                                fullWidth
                              />
                            )}
                            />
                    </div>
                  }
                    <div className="mb-24">
                    <Controller
                        name="do_not_contact"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            error={!!errors.do_not_contact}
                            required
                            helperText={errors?.do_not_contact?.message}
                            label="Are there any bookkeepers/accountant we should not contact"
                            autoFocus
                            id="do_not_contact"
                            variant="outlined"
                            fullWidth
                          />
                        )}
                      />
                    </div>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default LeadDetails;