import React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import { formatWebsiteUrl as addUrlPrefix } from "../../utils/helpers";

function CustomerCollapseMenu({ expanded, data }) {

  return (
    <Collapse in={expanded} timeout="auto" unmountOnExit>
      <Box margin={1}>
        <div className="flex justify-between mb-8 mt-12">
          <div className="w-full md:w-1/2 lg:w-1/3">
            <strong>LOCATION:</strong>
            <br />
            <strong>Company:</strong> {data.company?.company_name}
            <br />
            <strong>CVR:</strong> {data.company?.cvr}
            <br />
            <strong>Address:</strong> {data.company?.address}, {data.company?.postal_code} {data.company?.city}
            <br />
            <strong>Region:</strong> {data.company?.region}
            <br />
            <strong>Website:</strong> {data.company?.website ? <a href={addUrlPrefix(data.company?.website)} target="_blank" rel="noopener noreferrer">Visit Website</a> : "N/A"}
            <br />
            <strong>LinkedIn:</strong> {data.company?.linkedin ? <a href={addUrlPrefix(data.company?.linkedin)} target="_blank" rel="noopener noreferrer">Visit LinkedIn</a> : "N/A"}
            <br />
            <strong>Facebook:</strong> {data.company?.facebook ? <a href={addUrlPrefix(data.company?.facebook)} target="_blank" rel="noopener noreferrer">Visit Facebook</a> : "N/A"}
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3">
            <strong>CONTACT PERSON:</strong>
            <br />
            <strong>Title:</strong> {data.person?.title}
            <br />
            <strong>Name:</strong> {data.person?.first_name} {data.person?.last_name}
            <br />
            <strong>E-mail:</strong> {data.person?.email}
            <br />
            <strong>Phone:</strong> {data.person?.phone}
            <br />
            <strong>Website:</strong> {data.person?.website ? <a href={addUrlPrefix(data.person?.website)} target="_blank" rel="noopener noreferrer">Visit Website</a> : "N/A"}
            <br />
            <strong>LinkedIn:</strong> {data.person?.linkedin ? <a href={addUrlPrefix(data.person?.linkedin)} target="_blank" rel="noopener noreferrer">Visit LinkedIn</a> : "N/A"}
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3">
            <strong>INTERNAL COMMENTS:</strong><br />
            {data.notes || 'N/A'}
            <br />
          </div>
        </div>
        <div className="flex justify-between mb-8 mt-12">
          <div className="w-full md:w-1/2 lg:w-1/3">
            <strong>Customer location:</strong><br />
            {data.customer_locations.map((location) => (
              <div key={location.id}>
                {location.name}
              </div>
            ))}
            {data.customer_locations.length === 0 && <div>N/A</div>}
          </div>
        </div>
      </Box>
    </Collapse>
  );
}

export default CustomerCollapseMenu;
