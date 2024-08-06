
import LeadDetails from "../components/LeadDetails";

function BasicInfoTab(props) {
  const { data, locations, customerTypes, customerCategories  } = props;
  return (
    <div>
      <LeadDetails data={data} locations={locations} customerTypes={customerTypes} customerCategories={customerCategories} />
    </div>
  );
}

export default BasicInfoTab;
