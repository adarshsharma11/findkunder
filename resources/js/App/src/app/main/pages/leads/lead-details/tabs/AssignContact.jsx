import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Controller, useFormContext } from "react-hook-form";
import { useDispatch } from "react-redux";
import AssignLeadTable from "../components/assign-lead-table/AssignLeadTable";

const leadStatusData = [
  { label: 'Completed', value: '2' },
  { label: 'In Progress', value: '1' },
  { label: 'New', value: '0' },
];

function AssignContactTab(props) {
  const methods = useFormContext();
  const { data, leadStatus, updateAssignLeads, leadId } = props;
  const dispatch = useDispatch();
  const { control } = methods;


  return (
    <div className="flex flex-col">
      <div className="max-w-2xl">
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
      <div className="flex justify-between w-full space-x-8">
       <AssignLeadTable data={data} updateAssignLeads={updateAssignLeads} leadId={leadId} />
      </div>
    </div>
  );
}

export default AssignContactTab;
