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
            <InquiryStepForm />
        </div>
      </Paper>
     <HeroBox count={customersCount} isLoading={isLoading} welcomeHeading="Find bogholder/revisor!" descriptionText="We're here to help you find the perfect bookkeeper or accountant, all for free and with no obligation to choose any of our suggestions. Simply fill out our form, and we'll connect you with top freelance bookkeepers and accountants." isInquiryPage={true} />
    </div>
  );
}

export default InquiryPage;
