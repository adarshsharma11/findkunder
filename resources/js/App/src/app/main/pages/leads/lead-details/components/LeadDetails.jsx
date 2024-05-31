import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { motion } from "framer-motion";
import PriorityStatus from "./PriorityStatus";

function LeadDetails(props) {
  const { data } = props;

  const container = {
    show: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="w-full">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="w-full"
      >
        <div className="md:flex">
          <div className="flex flex-col flex-1 md:ltr:pr-32 md:rtl:pl-32">
            <Card component={motion.div} variants={item} className="w-full mb-32">
              <div className="px-32 pt-24">
                <Typography className="text-2xl font-semibold leading-tight">
                  General Information
                </Typography>
              </div>

              <CardContent className="px-32 py-24">
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <div className="mb-24">
                      <Typography className="font-semibold mb-4 text-15">
                        Company Name
                      </Typography>
                      <Typography>{data.company_name}</Typography>
                    </div>
                    <div className="mb-24">
                      <Typography className="font-semibold mb-4 text-15">
                        Contact Name
                      </Typography>
                      <Typography>{data.contact_name}</Typography>
                    </div>
                    <div className="mb-24">
                      <Typography className="font-semibold mb-4 text-15">
                        Contact Email
                      </Typography>
                      <Typography>{data.contact_email}</Typography>
                    </div>
                    <div className="mb-24">
                      <Typography className="font-semibold mb-4 text-15">
                        Contact Phone
                      </Typography>
                      <Typography>{data.contact_phone}</Typography>
                    </div>
                    <div className="mb-24">
                      <Typography className="font-semibold mb-4 text-15">
                        CVR Number
                      </Typography>
                      <Typography>{data.cvr_number}</Typography>
                    </div>
                    <div className="mb-24">
                      <Typography className="font-semibold mb-4 text-15">
                        City
                      </Typography>
                      <Typography>{data.city}</Typography>
                    </div>
                    <div className="mb-24">
                      <Typography className="font-semibold mb-4 text-15">
                        Street
                      </Typography>
                      <Typography>{data.street}</Typography>
                    </div>
                    <div className="mb-24">
                      <Typography className="font-semibold mb-4 text-15">
                        Postal Code
                      </Typography>
                      <Typography>{data.postal_code}</Typography>
                    </div>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <div className="mb-24">
                      <Typography className="font-semibold mb-4 text-15">
                        Customer Type
                      </Typography>
                      <Typography>{data.customer_type.name}</Typography>
                    </div>
                    <div className="mb-24">
                      <Typography className="font-semibold mb-4 text-15">
                        Physical Attendance Required
                      </Typography>
                      <Typography>{data.physical_attendance_required || "N/A"}</Typography>
                    </div>
                    <div className="mb-24">
                      <Typography className="font-semibold mb-4 text-15">
                        Physical Attendance Details
                      </Typography>
                      <Typography>{data.physical_attendance_details || "N/A"}</Typography>
                    </div>
                    <div className="mb-24">
                      <Typography className="font-semibold mb-4 text-15">
                        Specific Preferences
                      </Typography>
                      <Typography>{data.specific_preferences || "N/A"}</Typography>
                    </div>
                    <div className="mb-24">
                      <Typography className="font-semibold mb-4 text-15">
                        Status
                      </Typography>
                      <PriorityStatus priority={data.status} isDetailsPage />
                    </div>
                    <div className="mb-24">
                      <Typography className="font-semibold mb-4 text-15">
                        Website
                      </Typography>
                      <Typography>{data.website || "N/A"}</Typography>
                    </div>
                    <div className="mb-24">
                      <Typography className="font-semibold mb-4 text-15">
                        Who Do You Need
                      </Typography>
                      <Typography>{data.who_do_you_need || "N/A"}</Typography>
                    </div>
                    <div className="mb-24">
                      <Typography className="font-semibold mb-4 text-15">
                        Categories
                      </Typography>
                      {data.categories.map((category) => (
                        <Typography key={category.id}>{category.name}</Typography>
                      ))}
                    </div>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default LeadDetails;
