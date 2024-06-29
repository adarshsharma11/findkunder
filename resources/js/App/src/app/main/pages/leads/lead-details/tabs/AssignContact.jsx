import AssignLeadTable from "../components/assign-lead-table/AssignLeadTable";

function AssignContactTab(props) {
  const { data, updateAssignLeads, leadId, selected, setSelected } = props;

  return (
    <div className="flex flex-col">
      <div className="flex justify-between w-full space-x-8">
       <AssignLeadTable data={data} updateAssignLeads={updateAssignLeads} leadId={leadId} selected={selected} setSelected={setSelected} />
      </div>
    </div>
  );
}

export default AssignContactTab;
