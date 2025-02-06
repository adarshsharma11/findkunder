import LocationsTable from "./LocationTable";

function LocationInfoTab(props) {
  const { userId, productId } = props;
  return (
    <div>
      <LocationsTable userId={userId} productId={productId} {...props} />
    </div>
  );
}

export default LocationInfoTab;
