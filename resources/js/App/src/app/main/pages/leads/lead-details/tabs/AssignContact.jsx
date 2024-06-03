import { useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Controller, useFormContext } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { contactSchema } from "../../../../../schemas/validationSchemas";

const leadStatusData = [
  { label: 'Completed', value: '2' },
  { label: 'In Progress', value: '1' },
  { label: 'New', value: '0' },
];

function AssignContactTab(props) {
  const methods = useFormContext();
  const { data, leadStatus } = props;
  const { best, average, worse } = data;
  const dispatch = useDispatch();
  const { control, setValue } = methods;
  const [selectedCustomers, setSelectedCustomers] = useState([]);

  useEffect(() => {
    const preselectedCustomers = [...best, ...average, ...worse]
      .filter(customer => customer.lead_assigned)
      .map(customer => customer.customer.id);
    setSelectedCustomers(preselectedCustomers);
    setValue("assigned_customers", preselectedCustomers);
    setValue("status", leadStatus);
  }, [best, average, worse, setValue, leadStatus]);

  const handleCheckboxChange = (e, customerId) => {
    const isChecked = e.target.checked;
    const updatedCustomers = isChecked
      ? [...selectedCustomers, customerId]
      : selectedCustomers.filter(id => id !== customerId);
    setSelectedCustomers(updatedCustomers);
    setValue("assigned_customers", updatedCustomers);
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between w-full space-x-8">
        {['Best Match', 'Average Match', 'Worst Match'].map((label, index) => {
          const group = index === 0 ? best : index === 1 ? average : worse;
          return (
            <div key={label} className="w-full">
              <InputLabel id={`${label.replace(' ', '-').toLowerCase()}-label`}>{label}:</InputLabel>
              <Controller
                name="assigned_customers"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <div className="mt-8 mb-16">
                    {group && group.map((customer) => (
                      <div key={customer.customer.id}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              onChange={(e) => handleCheckboxChange(e, customer.customer.id)}
                              checked={selectedCustomers.includes(customer.customer.id)}
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
          );
        })}
      </div>
      <div className="max-w-3xl">
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select {...field} className="mt-8 mb-16" variant="outlined" fullWidth>
                <MenuItem value="" disabled>Select Status</MenuItem>
                {leadStatusData && leadStatusData.map((option) => (
                  <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
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
