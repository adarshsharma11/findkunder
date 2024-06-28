import React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Link from '@mui/material/Link';
import Typography from "@mui/material/Typography";
import { formatWebsiteUrl, formatAddress } from "../../utils/helpers";
import { formatCategories } from "../../utils/categoryHelpers";

function LeadsCollapseMenu({ expanded, data }) {
  const formattedCategories = data.categories && formatCategories(data.categories);

  const renderCategories = () => {
    return formattedCategories.map(category => (
      <div key={category.id}>
        <Typography>
          {category.name}
          {category.subcategories.length > 0 && (
            <Typography component="span">
              ({category.subcategories.map(sub => sub.name).join(', ')})
            </Typography>
          )}
        </Typography>
      </div>
    ));
  };
  return (
    <Collapse in={expanded} timeout="auto" unmountOnExit>
      <Box margin={1}>
        <div className="flex justify-between mb-8 mt-12">
          <div className="w-full md:w-1/2 lg:w-1/3">
            <strong>CONTACT</strong>
            <br />
            <strong>Contact Name:</strong> {data?.contact_name}
            <br />
            <strong>Contact Email:</strong> <Link href={`mailto:${data.contact_email}`} target="_blank" variant="body2" rel="noopener noreferrer">{data.contact_email}</Link>
            <br />
            <strong>Contact Phone:</strong> {data.contact_phone}
            <br />
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3">
            <strong>COMPANY</strong>
            <br />
            <strong>Company Name:</strong> {data?.company_name}
            <br />
            <strong>Tell us a bit about your company:</strong> {data.company_description || 'N/A'}
            <br />
            <strong>Website:</strong> {data.website ? (
              <Link href={formatWebsiteUrl(data.website)} target="_blank" rel="noopener noreferrer" variant="body2">
                          {data.website}
              </Link>
              ) : (
                        <Typography>N/A</Typography>
              )}
            <br />
            <strong>CVR Number:</strong> {data?.cvr_number}
            <br />
            <strong>Who are you:</strong> {data.customer_type.name}
            <br />
            <strong>Address:</strong> {formatAddress(data.street, data.postal_code, data.city)}
            <br />
            <strong>Your location:</strong> {data.location.name || "N/A"}
            <br />
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3">
            <strong>ADDITIONAL INFO</strong><br />
            <strong>Who Do You Need:</strong> {data?.who_do_you_need || 'N/A'}
            <br />
            <div className="flex">
            <strong>What do you need help for:</strong> 
            {data.categories.length > 0 ? renderCategories() : (
                        <Typography>N/A</Typography>
            )}
            </div>
            <strong>Do you have any specific preferences:</strong> {data?.specific_preferences || 'N/A'}
            <br />
            <strong>Is physical attendance required:</strong> {data.physical_attendance_required || "N/A" || 'N/A'}
            <br />
            <strong>Physical Attendance Details:</strong> {data.physical_attendance_details || "N/A"}
            <br />
            <strong>Are there any bookkeepers/accountant we should not contact:</strong> {data?.do_not_contact || 'N/A'}
            <br />
          </div>
        </div>
      </Box>
    </Collapse>
  );
}

export default LeadsCollapseMenu;
