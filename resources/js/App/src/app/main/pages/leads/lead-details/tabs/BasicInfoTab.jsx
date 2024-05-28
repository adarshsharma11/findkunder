
import LeadDetails from "../components/LeadDetails";

function BasicInfoTab(props) {
  const { data } = props;
  return (
    <div>
      <LeadDetails data={data} />
    </div>
  );
}

export default BasicInfoTab;
