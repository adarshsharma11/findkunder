import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import LocationsTable from "./LocationTable";

function LocationInfoTab(props) {
  const { userId, productId } = props;
  const navigate = useNavigate();

  // Determine if the Add Location button should be disabled
  const isAddLocationDisabled = productId === 'new';

  return (
    <div>
       <div className="flex justify-end mb-16">
        <Tooltip
          title={isAddLocationDisabled ? "Save the company first before adding locations" : ""}
          placement="top"
        >
          <span> {/* Wrapper needed for disabled buttons with tooltip */}
            <Button
              className="whitespace-nowrap"
              variant="contained"
              color="primary"
              size="small"
              disabled={isAddLocationDisabled}
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
          </span>
        </Tooltip>
       </div>
      <LocationsTable userId={userId} productId={productId} {...props} />
    </div>
  );
}

export default LocationInfoTab;
