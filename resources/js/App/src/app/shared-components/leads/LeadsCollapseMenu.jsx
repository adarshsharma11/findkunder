import React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";

function LeadsCollapseMenu({ expanded, data }) {

  return (
    <Collapse in={expanded} timeout="auto" unmountOnExit>
      <Box margin={1}>
        <div className="flex justify-between mb-8 mt-12">
          <div className="w-full md:w-1/2 lg:w-1/3">
            <strong>Company Info:</strong>
            <br />
            <strong>Postal Code:</strong> {data?.postal_code}
            <br />
            <strong>Address:</strong> {data.street}
            <br />
            <strong>Company Description:</strong> {data.company_description}
            <br />
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3">
            <strong>Assigned Person Info:</strong>
            <br />
            <strong>Email Address:</strong> {data.user?.email}
            <br />
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3">
            <strong>Addition Info:</strong><br />
            <strong>Who Do You Need:</strong> {data?.who_do_you_need || 'N/A'}
            <br />
            <strong>Physical Attendance Required:</strong> {data?.physical_attendance_required || 'N/A'}
            <br />
            <strong>Physical Attendance Details:</strong> {data?.physical_attendance_details || 'N/A'}
            <br />
            <strong>Specific Preferences:</strong> {data?.specific_preferences || 'N/A'}
            <br />
            <strong>Do Not Contact:</strong> {data?.do_not_contact || 'N/A'}
            <br />
            <strong>Website:</strong> {data?.website || 'N/A'}
            <br />
          </div>
        </div>
      </Box>
    </Collapse>
  );
}

export default LeadsCollapseMenu;
