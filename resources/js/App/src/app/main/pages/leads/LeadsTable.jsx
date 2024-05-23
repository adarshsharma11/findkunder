import FuseScrollbars from "@fuse/core/FuseScrollbars";
import _ from "@lodash";
import Checkbox from "@mui/material/Checkbox";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import moment from "moment";

import { useDispatch, useSelector } from "react-redux";
import withRouter from "@fuse/core/withRouter";
import FuseLoading from "@fuse/core/FuseLoading";
import {
  getProducts,
  selectProducts,
  selectProductsSearchText,
} from "./store/leadsSlice";
import LeadsTableHead from "./LeadsTableHead";
import LeadsCollapseMenu from "../../../shared-components/leads/LeadsCollapseMenu";

function LeadsTable(props) {
  const dispatch = useDispatch();
  const methods = useFormContext();
  const { setValue } = methods;
  const { getContactPersons, setLeadId, isAdmin } = props;
  const { t } = useTranslation("contactPerson");
  const products = useSelector(selectProducts);
  const searchText = useSelector(selectProductsSearchText);

  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState(products);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState({
    direction: "asc",
    id: null,
  });

  useEffect(() => {
    dispatch(getProducts()).then(() => setLoading(false));
  }, [dispatch]);

  useEffect(() => {
    if (searchText.length !== 0) {
      setData(
        _.filter(products, (item) =>
          item.contact_name.toLowerCase().includes(searchText.toLowerCase())
        )
      );
      setPage(0);
    } else {
      setData(products);
    }
  }, [products, searchText]);

  function handleRequestSort(event, property) {
    const id = property;
    let direction = "desc";

    if (order.id === property && order.direction === "desc") {
      direction = "asc";
    }

    setOrder({
      direction,
      id,
    });
  }

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      setSelected(data.map((n) => n.id));
      return;
    }
    setSelected([]);
  }

  function handleDeselect() {
    setSelected([]);
  }

  function handleClick(item) {
    const params = {
      locationId: item.location.id
    }
    if (item?.user_id) {
      setValue('person_id', item?.user_id);
    }
    if (item?.status && item?.status !== '0') {
      setValue('status', item?.status);
    }
    setLeadId(item.id);
    getContactPersons(params);
  }

  function handleCheck(event, id) {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  }

  function handleChangePage(event, value) {
    setPage(value);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
  }

  const handleExpand = (rowId) => {
    setExpanded(expanded === rowId ? null : rowId);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <FuseLoading />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          There are no leads!
        </Typography>
      </motion.div>
    );
  }

  const renderPriorityStatus = (priority) => {
    let buttonColor;
    let buttonText;
    switch (priority) {
      case "2":
        buttonColor = "success";
        buttonText = "Complete";
        break;
      case "1":
        buttonColor = "warning";
        buttonText = "Inprogress";
        break;
      default:
        buttonColor = "secondary";
        buttonText = "New";
    }
    return (
      <Button variant="contained" color={buttonColor} size="small">
        {buttonText}
      </Button>
    );
  }

  return (
    <div className="w-full flex flex-col min-h-full">
      <FuseScrollbars className="grow overflow-x-auto">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <LeadsTableHead
            selectedProductIds={selected}
            order={order}
            isAdmin={isAdmin}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={data.length}
            onMenuItemClick={handleDeselect}
          />

          <TableBody>
            {_.orderBy(
              data,
              [
                (o) => {
                  switch (order.id) {
                    case "categories": {
                      return o.categories[0];
                    }
                    default: {
                      return o[order.id];
                    }
                  }
                },
              ],
              [order.direction]
            )
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((n) => {
                const isSelected = selected.indexOf(n.id) !== -1;
                return (
                  <>
                  <TableRow
                    className="h-72 cursor-pointer"
                    hover
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.id}
                    selected={isSelected}
                  >
                    <TableCell
                      className="w-40 md:w-64 text-center"
                      padding="none"
                    >
                      <Checkbox
                        checked={isSelected}
                        onClick={(event) => event.stopPropagation()}
                        onChange={(event) => handleCheck(event, n.id)}
                      />
                    </TableCell>
                    <TableCell
                      className="w-52 px-4 md:px-0"
                      component="th"
                      scope="row"
                      padding="none"
                    >
                      <img
                        className="w-full block rounded"
                        src={
                          n.image
                            ? `assets/images/contact-person/${n.image}`
                            : "assets/images/apps/ecommerce/product-image-placeholder.png"
                        }
                        alt={t(n.title)}
                      />
                    </TableCell>
                    {isAdmin && 
                        <TableCell
                        className="p-4 md:p-16"
                        component="th"
                        scope="row"
                        align="right"
                        >
                        {renderPriorityStatus(n?.status)}
                        </TableCell>
                    }
                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                    >
                      {moment(n.created_at).format("YYYY-MM-DD HH:mm:ss") || "N/A"}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                    >
                      {n.cvr_number || "N/A"}
                    </TableCell>

                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                    >
                      {n.company_name || "N/A"}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                    >
                      {n.contact_name || "N/A"}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                    >
                      {n.contact_email || "N/A"}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                    >
                      {n.contact_phone || "N/A"}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                    >
                      {n.location?.name || "N/A"}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                    >
                      {n.customer_type?.name || "N/A"}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                    >
                      <Button
                        className="whitespace-nowrap"
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => handleExpand(n.id)}
                        startIcon={
                          <FuseSvgIcon size={20}>
                          { expanded === n.id ? 'heroicons-solid:arrow-circle-up' : 'heroicons-solid:arrow-circle-down' }
                          </FuseSvgIcon>
                        }
                      >
                        {expanded === n.id ? 'See Less' : 'See More'}
                      </Button>
                    </TableCell>
                    {isAdmin &&
                       <TableCell
                       className="p-4 md:p-16"
                       component="th"
                       scope="row"
                     >
                       <Button
                         className="whitespace-nowrap"
                         variant="contained"
                         color="primary"
                         size="small"
                         onClick={(event) => handleClick(n)}
                         startIcon={
                           <FuseSvgIcon size={20}>
                             heroicons-solid:external-link
                           </FuseSvgIcon>
                         }
                       >
                         {n.user_id && n.user_id === "" ? 'Assign Person' : 'Update Assigned Person' }
                       </Button>
                     </TableCell>
                    }
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
                      <LeadsCollapseMenu expanded={expanded === n.id} data={n} />
                    </TableCell>
                  </TableRow>
                   </>
                );
              })}
          </TableBody>
        </Table>
      </FuseScrollbars>

      <TablePagination
        className="shrink-0 border-t-1"
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          "aria-label": "Previous Page",
        }}
        nextIconButtonProps={{
          "aria-label": "Next Page",
        }}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default withRouter(LeadsTable);
