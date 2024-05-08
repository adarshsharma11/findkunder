import React from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useTranslation } from "react-i18next";
import InputLabel from "@mui/material/InputLabel";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Controller, useFormContext } from 'react-hook-form';


function AdditionalInfo(props) {
  const { customerCategories } = props;
  const { control, formState, watch } = useFormContext();
  const [selectedCategories, setSelectedCategories] = React.useState([]);
  const { errors } = formState;

  // Define static arrays for options
  const { t } = useTranslation("contactPerson");
  const titleOptions = [
    {
      value: "approved_auditor",
      label: t("approved_auditor"),
    },
    {
      value: "bookkeeper",
      label: t("bookkeeper"),
    },
    {
      value: "other",
      label: t("other"),
    },
  ];
  const helpOptions = ["Tax Preparation", "Bookkeeping", "Financial Planning"];

  return (
    <div>
      {/* Who do you need? */}
      <Controller
        name="whoDoYouNeed"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            id="whoDoYouNeed"
            select
            label="Who do you need?"
            variant="outlined"
            fullWidth
          >
            {titleOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        )}
      />

       <InputLabel id="categories-label">What do you need help for?</InputLabel>
        <Controller
          name="helpNeeded"
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

      {/* Specific Preferences */}
      <Controller
        name="specificPreferences"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            id="specificPreferences"
            error={!!errors.specificPreferences}
            helperText={errors?.specificPreferences?.message}
            label="Specific Preferences"
            variant="outlined"
            fullWidth
          />
        )}
      />

      {/* Is physical attendance required? */}
      <Controller
        name="physicalAttendanceRequired"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            id="physicalAttendanceRequired"
            select
            label="Is physical attendance required?"
            variant="outlined"
            fullWidth
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </TextField>
        )}
      />

      {/* Please elaborate on your need regarding physical attendance */}
      {watch('physicalAttendanceRequired') === 'Yes' && (
        <Controller
          name="physicalAttendanceDetails"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8 mb-16"
              id="physicalAttendanceDetails"
              label="Please elaborate on your need regarding physical attendance"
              variant="outlined"
              fullWidth
            />
          )}
        />
      )}

      {/* Are there any bookkeepers/accountants we should not contact? */}
      <Controller
        name="doNotContact"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            id="doNotContact"
            label="Are there any bookkeepers/accountants we should not contact?"
            variant="outlined"
            fullWidth
          />
        )}
      />
    </div>
  );
}

export default AdditionalInfo;
