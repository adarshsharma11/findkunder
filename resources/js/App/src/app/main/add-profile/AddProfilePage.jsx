import _ from "@lodash";
import Paper from "@mui/material/Paper";
import HeroBox from "../../shared-components/HeroBox";
import AddProfileStepForm from "./AddProfileStepForm";
import { useCustomersCount } from "../../CustomersCountContext";

function AddProfilePage() {
  const { customersCount, isLoading } = useCustomersCount();

  return (
    <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-1 min-w-0">
      <Paper className="h-full sm:h-auto md:flex md:items-center md:justify-end w-full sm:w-auto md:h-full md:w-1/2 py-8 px-16 sm:p-48 md:p-64 sm:rounded-2xl md:rounded-none sm:shadow md:shadow-none ltr:border-r-1 rtl:border-l-1">
        <div className="w-full">
          <AddProfileStepForm />
        </div>
      </Paper>
     <HeroBox count={customersCount} isLoading={isLoading} />
    </div>
  );
}

export default AddProfilePage;
