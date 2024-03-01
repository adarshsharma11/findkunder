import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Checkbox from "@mui/material/Checkbox";
import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Controller, useFormContext } from "react-hook-form";

function BasicInfoTab(props) {
  const methods = useFormContext();
  const { categories, categoryId, product } = props;
  const { control, formState } = methods;
  const { errors } = formState;
  const [subcategories, setSubcategories] = React.useState([]);

  React.useEffect(() => {
    if (product && product.subcategories) {
      setSubcategories(
        product.subcategories.map((subcategory) => subcategory.id)
      );
    }
  }, [product]);
  return (
    <div>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.name}
            required
            helperText={errors?.name?.message}
            label="Name"
            autoFocus
            id="name"
            variant="outlined"
            fullWidth
          />
        )}
      />
      {categoryId && categoryId === "new" && (
        <Controller
          name="parent_id"
          control={control}
          render={({ field }) => (
            <>
              <InputLabel id="demo-simple-select-label">
                Parent Category
              </InputLabel>
              <Select
                {...field}
                className="mt-8 mb-16"
                error={!!errors.status}
                required
                displayEmpty
                helperText={errors?.status?.message}
                id="parent_id"
                variant="outlined"
                fullWidth
              >
                <MenuItem value="" disabled>
                  Select Parent Category
                </MenuItem>
                {categories &&
                  categories?.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
              </Select>
            </>
          )}
        />
      )}

      {categoryId && categoryId !== "new" && product?.subcategories && (
        <Controller
          name="subcategories"
          control={control}
          render={({ field }) => (
            <div>
              <InputLabel id="demo-checkbox-label">Subcategories</InputLabel>
              {product &&
                product?.subcategories.map((subcategory) => (
                  <FormControlLabel
                    key={subcategory.id}
                    control={
                      <Checkbox
                        onChange={(e) => {
                          const updatedSubcategories = e.target.checked
                            ? [...subcategories, subcategory.id]
                            : subcategories.filter(
                                (id) => id !== subcategory.id
                              );
                          setSubcategories(updatedSubcategories);
                          field.onChange(updatedSubcategories);
                        }}
                        checked={subcategories.includes(subcategory.id)}
                      />
                    }
                    label={subcategory.name}
                  />
                ))}
            </div>
          )}
        />
      )}
    </div>
  );
}

export default BasicInfoTab;
