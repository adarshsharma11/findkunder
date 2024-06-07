import FuseScrollbars from "@fuse/core/FuseScrollbars";
import _ from "@lodash";
import Checkbox from "@mui/material/Checkbox";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { blue } from '@mui/material/colors';
import Button from "@mui/material/Button";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import withRouter from "@fuse/core/withRouter";
import FuseLoading from "@fuse/core/FuseLoading";
import { showMessage } from "app/store/fuse/messageSlice";
import AssignLeadTableHead from "./AssignLeadTableHead";
import AssignLeadsCollapaseMenu from "../../../../../../shared-components/leads/AssignLeadsCollapaseMenu";
import LoadingButton from "../../../../../../shared-components/button/LoadingButton";

function AssignLeadTable(props) {
  const dispatch = useDispatch();
  const { getContactPersons, setLeadId, isAdmin, data: assignLeadData, updateAssignLeads, leadId } = props;
  const { t } = useTranslation("contactPerson");
  const products = assignLeadData;
  const [searchText, setSearchText] = useState("");
  const [expanded, setExpanded] = useState(null);
  const [loadingState, setLoadingState] = useState({});
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState(assignLeadData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState({
    direction: "asc",
    id: null,
  });

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

  async function handleClick(item) {
    setLoadingState(prevState => ({ ...prevState, [item.id]: true })); // Set isLoading to true before the request
    const params = {
      assigned_customers: [item?.id],
      lead_id: leadId,
    };
    try {
      await updateAssignLeads(params);
    } catch (error) {
      dispatch(showMessage({ message: "Something went wrong!", variant: 'error'  }));
    } finally {
      setLoadingState(prevState => ({ ...prevState, [item.id]: false })); // Set isLoading to false after the request completes (whether successful or not)
    }
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

  if (!assignLeadData) {
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

  return (
    <div className="w-full flex flex-col min-h-full">
      <FuseScrollbars className="grow overflow-x-auto">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <AssignLeadTableHead
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
              .map((n, index) => {
                const isSelected = selected.indexOf(n.id) !== -1;
                return (
                  <>
                  <TableRow
                    className="h-72 cursor-pointer"
                    hover
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.customer.id}
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
                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                    >
                      {`# ${++index}`}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                    >
                      {n.customer?.company?.company_name || "N/A"}
                    </TableCell>

                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                    >
                      {n.customer?.person?.first_name || "N/A"}
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
                        onClick={() => handleExpand(n?.customer?.id)}
                        startIcon={
                          <FuseSvgIcon size={20}>
                          { expanded === n.id ? 'heroicons-solid:arrow-circle-up' : 'heroicons-solid:arrow-circle-down' }
                          </FuseSvgIcon>
                        }
                      >
                        {expanded === n?.customer?.id ? 'See Less' : 'See More'}
                      </Button>
                    </TableCell>
                       <TableCell
                       className="p-4 md:p-16"
                       component="th"
                       scope="row"
                     >
                       <LoadingButton
                         className="whitespace-nowrap"
                         variant="contained"
                         sx={{ m: 1, position: 'relative' }}
                         color={n?.lead_assigned ? 'warning' : 'success'}
                         size="small"
                         isLoading={loadingState[n?.customer?.id] || false}
                         onClick={(event) => handleClick(n?.customer)}
                         disabled={loadingState[n?.customer?.id]}
                         circularProgressProps={{
                          sx: {
                            color: blue[500],
                            position: 'absolute',
                            top: '50%',
                            left: '22%',
                            marginTop: '-12px',
                            marginLeft: '-12px',
                          },
                        }}
                         text={n?.lead_assigned ? 'Unassign' : 'Assign'}
                       />
                       
                     </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
                      <AssignLeadsCollapaseMenu expanded={expanded === n?.customer?.id} data={n?.customer} />
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

export default withRouter(AssignLeadTable);
