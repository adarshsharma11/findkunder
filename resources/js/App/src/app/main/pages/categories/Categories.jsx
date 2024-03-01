import FusePageCarded from "@fuse/core/FusePageCarded";
import withReducer from "app/store/withReducer";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import reducer from "./store";
import CategoriesHeader from "./CategoriesHeader";
import CategoriesTable from "./CategoriesTable";

function Categories() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <FusePageCarded
      header={<CategoriesHeader />}
      content={<CategoriesTable />}
      scroll={isMobile ? "normal" : "content"}
    />
  );
}

export default withReducer("categories", reducer)(Categories);
