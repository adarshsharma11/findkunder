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
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import withRouter from "@fuse/core/withRouter";
import FuseLoading from "@fuse/core/FuseLoading";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import {
  getCompanies,
  selectCompanies,
  selectCompaniesSearchText,
} from "./store/companiesSlice";
import CompaniesTableHead from "./CompaniesTableHead";
import ViewDescriptionDialog from "../../../shared-components/view-description-dialog";

function CompaniesTable(props) {
  const dispatch = useDispatch();
  const products = useSelector(selectCompanies);
  const searchText = useSelector(selectCompaniesSearchText);

  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState(products);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState({
    direction: "asc",
    id: null,
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState('');

  const handleToggleDialog = (content) => {
    setDialogContent(content);
    setDialogOpen(!dialogOpen);
  };

  useEffect(() => {
    dispatch(getCompanies()).then(() => setLoading(false));
  }, [dispatch]);

  useEffect(() => {
    if (searchText.length !== 0) {
      setData(
        _.filter(products, (item) =>
          item.company_name.toLowerCase().includes(searchText.toLowerCase())
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
    props.navigate(`/companies/${item.id}`);
  }

  function handleAddLocation(item) {
    props.navigate(`/locations/new/${item.id}`);
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
          There are no companies!
        </Typography>
      </motion.div>
    );
  }

  return (
    <div className="w-full flex flex-col min-h-full">
      <FuseScrollbars className="grow overflow-x-auto">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <CompaniesTableHead
            selectedProductIds={selected}
            order={order}
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
                            ? `assets/images/company-logo/${n.image}`
                            : "assets/images/apps/ecommerce/product-image-placeholder.png"
                        }
                        alt={n.company_name}
                      />
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                    >
                      {n.company_name}
                    </TableCell>

                    <TableCell
                      className="p-4 md:p-16 truncate"
                      component="th"
                      scope="row"
                    >
                      {n.cvr}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-16 truncate"
                      component="th"
                      scope="row"
                    >
                  {n.description ? (
                      <>
                        {n.description.length > 20 ? (
                          <>
                            {n.description.substring(0, 20)}...
                            <Button
                              variant="text"
                              color="primary"
                              onClick={() => handleToggleDialog(n.description)}
                            >
                              See More
                            </Button>
                          </>
                        ) : (
                          n.description
                        )}
                      </>
                    ) : 'N/A'}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                      align="right"
                    >
                      {n.website ? (
                        <div className="flex justify-end">
                          <a
                            target="_blank"
                            href={`https://${n.website}`}
                            rel="noopener noreferrer"
                            role="button"
                          >
                            <FuseSvgIcon
                              className="text-48"
                              size={24}
                              color="secondary"
                            >
                              heroicons-outline:eye
                            </FuseSvgIcon>
                          </a>
                        </div>
                      ) : (
                        "N/A"
                      )}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                      align="right"
                    >
                      {n.linkedin ? (
                        <div className="flex justify-end">
                          <a
                            target="_blank"
                            href={`https://${n.linkedin}`}
                            rel="noopener noreferrer"
                            role="button"
                          >
                            <FuseSvgIcon
                              className="text-48"
                              size={24}
                              color="secondary"
                            >
                              heroicons-outline:information-circle
                            </FuseSvgIcon>
                          </a>
                        </div>
                      ) : (
                        "N/A"
                      )}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                      align="right"
                    >
                      {n.facebook ? (
                        <div className="flex justify-end">
                          <a
                            target="_blank"
                            href={`https://${n.facebook}`}
                            rel="noopener noreferrer"
                            role="button"
                          >
                            <FuseSvgIcon
                              className="text-48"
                              size={24}
                              color="secondary"
                            >
                              material-solid:facebook
                            </FuseSvgIcon>
                          </a>
                        </div>
                      ) : (
                        "N/A"
                      )}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                      align="right"
                    >
                       {n.locations_count === 0 ? (
                          <Button
                            className="whitespace-nowrap"
                            variant="contained"
                            color="secondary"
                            size="small"
                            onClick={() => handleAddLocation(n)}
                            startIcon={
                              <FuseSvgIcon size={20}>
                                heroicons-solid:plus
                              </FuseSvgIcon>
                            }
                          >
                            Add Location
                          </Button>
                        ) : (
                          <span>{n.locations_count}</span>
                        )}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                      align="right"
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
                        View/Edit
                      </Button>
                    </TableCell>
                  </TableRow>
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
      <ViewDescriptionDialog
        open={dialogOpen}
        toggleDialog={setDialogOpen}
        dialogTitle="Description"
        dialogContent={dialogContent}
      />
    </div>
  );
}

export default withRouter(CompaniesTable);
