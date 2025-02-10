import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import LocationsTable from "./LocationTable";

function LocationInfoTab(props) {
  const { userId, productId } = props;
  const navigate = useNavigate();
  return (
    <div>
       <div className="flex justify-end mb-16">
        <Button
        className="whitespace-nowrap"
        variant="contained"
        color="primary"
        size="small"
        onClick={() => {
          if (productId !== 'new') {
            navigate(`/locations/new/${productId}`)
          } else {
            navigate('/locations/new')
          }
        }}
        startIcon={
            <FuseSvgIcon size={20}>
            heroicons-solid:external-link
            </FuseSvgIcon>
        }
        >
            Add Location
        </Button>
       </div>
      <LocationsTable userId={userId} productId={productId} {...props} />
    </div>
  );
}

export default LocationInfoTab;
