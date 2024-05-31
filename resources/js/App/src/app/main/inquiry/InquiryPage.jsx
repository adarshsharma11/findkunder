import Typography from "@mui/material/Typography";
import _ from "@lodash";
import Paper from "@mui/material/Paper";
import HeroBox from "../../shared-components/HeroBox";
import InquiryStepForm from "./InquiryStepForm";
import { useCustomersCount } from "../../CustomersCountContext";


function InquiryPage() {
  const { customersCount, isLoading } = useCustomersCount();

  return (
    <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-1 min-w-0">
      <Paper className="h-full sm:h-auto md:flex md:items-center md:justify-end w-full sm:w-auto md:h-full md:w-1/2 py-8 px-16 sm:p-48 md:p-64 sm:rounded-2xl md:rounded-none sm:shadow md:shadow-none ltr:border-r-1 rtl:border-l-1">
        <div className="w-full">
          <img className="w-48" src="assets/images/logo/logo.svg" alt="logo" />
          <Typography className="mt-32 text-4xl font-extrabold tracking-tight leading-tight">
            Inquiry
          </Typography>
          <div className="flex items-baseline mt-2 mb-8 font-bold">
            <Typography>Let us help you find an accountant - for free and with no obligation.</Typography>
          </div>
          <div className="flex items-baseline mt-2 font-medium">
            <Typography>Fill out the form, and we'll find an accountant who matches your preferences and needs.</Typography>
          </div>
            <InquiryStepForm />
        </div>
      </Paper>
     <HeroBox count={customersCount} isLoading={isLoading} />
    </div>
  );
}

export default InquiryPage;
