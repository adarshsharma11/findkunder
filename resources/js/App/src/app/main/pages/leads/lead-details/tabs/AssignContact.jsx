import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import { Controller, useFormContext } from "react-hook-form";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch } from "react-redux";
import { contactSchema } from "../../../../../schemas/validationSchemas";

const leadStatus = [
  {
   label: 'Completed',
   value: '2',
  },
  {
   label: 'In Progress',
   value: '1',
  }
 ]
function AssignContactTab(props) {
  const methods = useFormContext();
  const dispatch = useDispatch();
  const contactMethods = useForm({
    mode: "onChange",
    defaultValues: {},
    resolver: yupResolver(contactSchema),
  });
  const {
    categories,
    customerTypes,
    customerLocations,
  } = props;
  const { control, formState, setValue, trigger } = methods;
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedCustomerTypes, setSelectedCutomerTypes] = useState([]);
  const { errors } = formState;
  const defaultData = [{
    id: 1,
    name: 'test'
  }]

  return (
    <div className="flex flex-col">
    <div className="flex justify-between w-full space-x-8">
      <div className="w-full">
        <InputLabel id="customerTypes-label">Best Match:</InputLabel>
        <Controller
          name="customer_types"
          control={control}
          defaultValue={[]}
          //value={selectedCustomerTypes}
          render={({ field: { onChange, value } }) => (
            <div className="mt-8 mb-16">
              {defaultData &&
                defaultData?.map((category) => (
                  <div key={category.id}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={(e) => {
                            const isChecked = e.target.checked;
                            const updatedCategories = isChecked && !selectedCustomerTypes.includes(category.id)
                              ? [...selectedCustomerTypes, category.id]
                              : selectedCustomerTypes.filter((id) => id !== category.id);
                              setSelectedCutomerTypes(updatedCategories);
                            onChange(updatedCategories);
                          }}
                          checked={selectedCustomerTypes.includes(category.id)}
                        />
                      }
                      label={category.name}
                    />
                  </div>
                ))}
            </div>
          )}
        />
        </div>
        <div className="w-full">
        <InputLabel id="customerTypes-label">Average match:</InputLabel>
        <Controller
          name="customer_locations"
          control={control}
          defaultValue={[]}
          //value={selectedLocations}
          render={({ field: { onChange, value } }) => (
            <div className="mt-8 mb-16">
              {defaultData &&
                defaultData?.map((category) => (
                  <div key={category.id}>
                    <FormControlLabel
                      control={
                        <Checkbox
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          const locationId = category.id;
                          let updatedLocations;
                          if (isChecked && !selectedLocations.includes(category.id)) {
                            updatedLocations = [...selectedLocations, category.id];
                          } else {
                            updatedLocations = selectedLocations.filter((id) => id !== locationId);
                          }
                          setSelectedLocations(updatedLocations);
                          onChange(updatedLocations);
                          //trigger("customerLocations");
                        }}
                        checked={selectedLocations.includes(category.id)}
                        />
                      }
                      label={category.name}
                    />
                  </div>
                ))}
            </div>
          )}
        />
        </div>
        <div className="w-full">
        <InputLabel id="categories-label">Worst Match:</InputLabel>
        <Controller
          name="categories"
          control={control}
          defaultValue={[]}
          render={({ field: { onChange, value } }) => (
            <div className="mt-8 mb-16">
              {defaultData &&
                defaultData?.map((category) => (
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
                  </div>
                ))}
            </div>
          )}
        />
        </div>
      </div>
      <div className="max-w-3xl">
      <Controller
        name="status"
        control={control}
        render={({ field }) => (
          <>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              {...field}
              className="mt-8 mb-16"
              error={!!errors.status}
              required
              displayEmpty
              helperText={errors?.status?.message}
              id="person_id"
              variant="outlined"
              fullWidth
            >
              <MenuItem value="" disabled>
                Select Status
              </MenuItem>
              {leadStatus &&
                leadStatus?.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
            </Select>
          </>
        )}
      />
      </div>
    </div>
  );
}

export default AssignContactTab;
