import UpdateProfile from "../../../../../shared-components/welcome-dialog/steps/UpdateProfile";

function BasicInfoTab(props) {
  const { productId } = props;

  return (
    <div>
     <UpdateProfile productId={productId} />
    </div>
  );
}

export default BasicInfoTab;
