import React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";

function AssignLeadsCollapseMenu({ expanded, data }) {

  return (
    <Collapse in={expanded} timeout="auto" unmountOnExit>
      <Box margin={1}>
        <div className="flex justify-between mb-8 mt-12">
          <div className="w-full md:w-1/2 lg:w-1/3">
            <strong>Company Info:</strong>
            <br />
            <strong>Postal Code:</strong> {data?.company?.postal_code}
            <br />
            <strong>Address:</strong> {data?.company?.street}
            <br />
            <strong>Company Description:</strong> {data?.company?.company_description}
            <br />
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3">
            <strong>Person Info:</strong>
            <br />
            <strong>Email Address:</strong> {data.person?.email}
            <br />
            <strong>Title:</strong> {data.person?.title}
            <br />
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3">
            <strong>Addition Info:</strong><br />
            <strong>Lead Assigned To Profile:</strong> {data?.assign_lead ? 'YES' : 'NO'}
            <br />
          </div>
        </div>
      </Box>
    </Collapse>
  );
}

export default AssignLeadsCollapseMenu;
