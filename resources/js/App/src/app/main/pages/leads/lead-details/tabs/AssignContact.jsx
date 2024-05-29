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
  const { data } = props;
  const { best, average, worse } = data;
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
              {best &&
                best?.map((customer) => (
                  <div key={customer.customer.id}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={(e) => {
                            const isChecked = e.target.checked;
                            const customerId = customer.customer.id;
                            const updatedCategories = isChecked && !selectedCustomerTypes.includes(customerId)
                              ? [...selectedCustomerTypes, customerId]
                              : selectedCustomerTypes.filter((id) => id !== customerId);
                              setSelectedCutomerTypes(updatedCategories);
                            onChange(updatedCategories);
                          }}
                          checked={selectedCustomerTypes.includes(customer.customer.id)}
                        />
                      }
                      label={`${customer.customer.person.first_name} ${customer.customer.person.last_name}`}
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
              {average &&
                average?.map((customer) => (
                  <div key={customer.customer.id}>
                    <FormControlLabel
                      control={
                        <Checkbox
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          const customerId = customer.customer.id;
                          let updatedLocations;
                          if (isChecked && !selectedLocations.includes(customerId)) {
                            updatedLocations = [...selectedLocations, customerId];
                          } else {
                            updatedLocations = selectedLocations.filter((id) => id !== customerId);
                          }
                          setSelectedLocations(updatedLocations);
                          onChange(updatedLocations);
                          //trigger("customerLocations");
                        }}
                        checked={selectedLocations.includes(customer.customer.id)}
                        />
                      }
                      label={`${customer.customer.person.first_name} ${customer.customer.person.last_name}`}
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
              {worse &&
                worse?.map((customer) => (
                  <div key={customer.customer.id}>
                    <FormControlLabel
                      control={
                        <Checkbox
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          const customerId = customer.customer.id;
                          const updatedCategories = isChecked  && !selectedCategories.includes(customerId)
                            ? [...selectedCategories, customerId]
                            : selectedCategories.filter(
                                (id) => id !== category.id
                              );
                          setSelectedCategories(updatedCategories);
                          onChange(updatedCategories);
                        }}
                        checked={selectedCategories.includes(customer.customer.id)}
                        />
                      }
                      label={`${customer.customer.person.first_name} ${customer.customer.person.last_name}`}
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
