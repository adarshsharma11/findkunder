import FuseScrollbars from "@fuse/core/FuseScrollbars";
import React from "react";
import _ from "@lodash";
import Checkbox from "@mui/material/Checkbox";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import withRouter from "@fuse/core/withRouter";
import FuseLoading from "@fuse/core/FuseLoading";
import {
  getProducts,
  selectProducts,
  selectProductsSearchText,
} from "./store/customersSlice";
import CustomersTableHead from "./CustomersTableHead";

function CutomersTable(props) {
  const dispatch = useDispatch();
  const { handleOpenDialog, handleDialogData, isAdmin } = props;
  const { t } = useTranslation("contactPerson");
  const products = useSelector(selectProducts);
  const searchText = useSelector(selectProductsSearchText);
  const [expanded, setExpanded] = useState(null); 

  const [loading, setLoading] = useState(true);
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
    setData(
      _.filter(products, (item) => {
        const searchString = searchText.toLowerCase();
        const firstNameMatch = item.person?.first_name
          ?.toLowerCase()
          ?.includes(searchString);
        const postalCodeMatch = item.company?.postal_code
          ?.toLowerCase()
          ?.includes(searchString);
        const regionMatch = item.company?.region
          ?.toLowerCase()
          ?.includes(searchString);
        const categoriesMatch = item.categories?.some((category) =>
          category.name?.toLowerCase()?.includes(searchString)
        );
        const customerTypesMatch = item.customer_types?.some((customerType) =>
          customerType.name?.toLowerCase()?.includes(searchString)
        );

        // Add more criteria as needed

        return (
          firstNameMatch ||
          postalCodeMatch ||
          regionMatch ||
          categoriesMatch ||
          customerTypesMatch
          // Add more conditions with logical OR (||) as needed
        );
      })
    );
    setPage(0);
  }, [products, searchText]);

  const handleExpand = (rowId) => {
    setExpanded(expanded === rowId ? null : rowId);
  };

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
    const navigationLink = isAdmin ? `/account-profile/${item.id}/${item.user_id}?sprn=admin` : `/profiles/${item.id}`;
    props.navigate(navigationLink);
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

  const renderPriorityStatus = (priority) => {
    let buttonColor;
    let buttonText;
    switch (priority) {
      case "3":
        buttonColor = "success";
        buttonText = "High";
        break;
      case "2":
        buttonColor = "warning";
        buttonText = "Medium";
        break;
      case "1":
        buttonColor = "secondary";
        buttonText = "Low";
        break;
      default:
        buttonColor = "inherit";
        buttonText = "None";
    }
    return (
      <Button variant="contained" color={buttonColor} size="small">
        {buttonText}
      </Button>
    );
  } 
  
  function addUrlPrefix(url) {
    if (url && !url.startsWith("http://") && !url.startsWith("https://")) {
      return "https://" + url;
    }
    return url;
  }

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
          There are no profiles!
        </Typography>
      </motion.div>
    );
  }

  return (
    <div className="w-full flex flex-col min-h-full">
      <FuseScrollbars className="grow overflow-x-auto">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <CustomersTableHead
            selectedProductIds={selected}
            order={order}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={data.length}
            onMenuItemClick={handleDeselect}
            isAdmin={isAdmin}
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
                  <React.Fragment key={n.id}>
                  <TableRow
                    className="h-72 cursor-pointer"
                    hover
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
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
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                    >
                      {n.company?.company_name}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-16 truncate"
                      component="th"
                      scope="row"
                    >
                      {n.company?.postal_code}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-16 truncate"
                      component="th"
                      scope="row"
                    >
                      {n.company?.location}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-16 truncate"
                      component="th"
                      scope="row"
                    >
                      {n.person?.title && n.person.title.charAt(0).toUpperCase() + n.person.title.slice(1)}
                    </TableCell>

                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                      align="right"
                    >
                      {n.person?.first_name}
                    </TableCell>

                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                      align="right"
                    >
                      {n.person?.email}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                      align="right"
                    >
                      {n.person?.phone}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                      align="right"
                    >
                      {n?.notes || "N/A"}
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
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
                    <Collapse in={expanded === n.id} timeout="auto" unmountOnExit>
                      <Box margin={1}>
                        <div className="flex justify-between mb-8 mt-12">
                          <div>
                            <strong>LOCATION:</strong>
                            <br />
                            <strong>Company:</strong> {n.company?.company_name}
                            <br />
                            <strong>CVR:</strong> {n.company?.cvr}
                            <br />
                            <strong>Address:</strong> {n.company?.address}, {n.company?.postal_code} {n.company?.city}
                            <br />
                            <strong>Region:</strong> {n.company?.region}
                            <br />
                            <strong>Website:</strong> {n.company?.website ? <a href={addUrlPrefix(n.company?.website)} target="_blank" rel="noopener noreferrer">Visit Website</a> : "N/A"}
                            <br />
                            <strong>LinkedIn:</strong> {n.company?.linkedin ? <a href={addUrlPrefix(n.company?.linkedin)} target="_blank" rel="noopener noreferrer">Visit LinkedIn</a> : "N/A"}
                            <br />
                            <strong>Facebook:</strong> {n.company?.facebook ? <a href={addUrlPrefix(n.company?.facebook)} target="_blank" rel="noopener noreferrer">Visit Facebook</a> : "N/A"}
                          </div>
                          <div>
                            <strong>CONTACT PERSON:</strong>
                            <br />
                            <strong>Title:</strong> {n.person?.title}
                            <br />
                            <strong>Name:</strong> {n.person?.first_name} {n.person?.last_name}
                            <br />
                            <strong>E-mail:</strong> {n.person?.email}
                            <br />
                            <strong>Phone:</strong> {n.person?.phone}
                            <br />
                            <strong>Website:</strong> {n.person?.website ? <a href={addUrlPrefix(n.person?.website)} target="_blank" rel="noopener noreferrer">Visit Website</a> : "N/A"}
                            <br />
                            <strong>LinkedIn:</strong> {n.person?.linkedin ? <a href={addUrlPrefix(n.person?.linkedin)} target="_blank" rel="noopener noreferrer">Visit LinkedIn</a> : "N/A"}
                          </div>
                          <div>
                            <strong>INTERNAL COMMENTS:</strong><br />
                            {n.notes || 'N/A'}
                            <br />
                          </div>
                        </div>
                        <div className="flex justify-between mb-8 mt-12">
                          <div>
                            <strong>The customer can be:</strong><br />
                            {n.customer_types.map((type) => (
                              <div key={type.id}>
                                {type.name}
                              </div>
                            ))}
                            {n.customer_types.length === 0 && <div>N/A</div>}
                          </div>
                          <div>
                            <strong>I/we offer:</strong><br />
                            {n.categories.map((category) => (
                              <div key={category.id}>
                                <div>{category.name}
                                {category.subcategories && category.subcategories.length > 0 && (
                                  <span>
                                    (
                                    {category.subcategories.map((sub) => (
                                      <span key={sub.id}>{sub.name}, </span>
                                    ))}
                                    )
                                  </span>
                                )}
                                </div>
                              </div>
                            ))}
                            {n.categories.length === 0 && <div>N/A</div>}
                          </div>
                          <div>
                            <strong>Customer location:</strong><br />
                            {n.customer_locations.map((location) => (
                              <div key={location.id}>
                                {location.name}
                              </div>
                            ))}
                            {n.customer_locations.length === 0 && <div>N/A</div>}
                          </div>
                        </div>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
                </React.Fragment>
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

export default withRouter(CutomersTable);
