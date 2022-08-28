import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Checkbox,
  TableFooter,
  TableSortLabel,
  TablePagination,
} from "@mui/material";
// import { visuallyHidden } from '@mui/utils';
// import Box from '@mui/material/Box';
import React, { useState, useEffect } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import "../App.css";
import { Button } from "react-bootstrap";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";

import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { DropdownButton, Dropdown } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import LastPageIcon from "@mui/icons-material/LastPage";
import FirstPageIcon from "@mui/icons-material/FirstPage";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  // backgroundColor: alpha(theme.palette.common.white, 0.15),
  // '&:hover': {
  //   backgroundColor: alpha(theme.palette.common.white, 0.25),
  // },
  border: "1px solid rgba(0,0,0,0.5)",
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Home3() {
  // const isSelected = (name) => indexOf(name) !== -1;
  // const isItemSelected = isSelected(true)
  const [pageCount, setPageCount] = useState(0);
  const [pageChangeCount, setChangeCount] = useState(1);
  const [counter, setCounter] = useState(1);
  const handleClick = (event, name) => {
    // alert("hello");
  };
  const [users, setUsers] = useState([]);
  useEffect(() => {
    // fetchData()
    getPosts();
  }, []);
  const getPosts = async () => {
    //     const devEnc = process.env.NODE_ENV !== "production";
    // const {REACT_APP_DEV_URL,REACT_APP_PROD_URL} = process.env
    // const res = await fetch(`http://localhost:3004/posts?_page=1&_limit=${limit}`)
    // const res = await fetch(`http://localhost:5000/users?_page=1`);
    const res = await fetch(`http://localhost:5000/users`);
    const data = await res.json();
    const total = res.headers.get("x-total-count");
    // console.log(total);
    let limit = 10;
    setPageCount(Math.ceil(total / limit));
    setUsers(data);
  };
  // const fetchData = async() => {
  //   await fetch('http://localhost:5000/users')
  //   .then(res => res.json())
  //   .then(data => setUsers(data))
  //   .catch(err => console.log(err))
  // }
  console.log(users);
  const handleSearch = async (e) => {
    e.preventDefault();
    const res = await fetch(
      // `http://localhost:5000/users?q=${e.target.value}&_page=1`
      `http://localhost:5000/users?q=${e.target.value}`
    );
    // .then(res => res.json())
    // .then(data => {
    //   setUsers(data)
    // })
    // .catch(err => {
    //     console.log(err);
    //     alert("Server not Work")
    // })
    const data = await res.json();
    const total = res.headers.get("x-total-count");
    // console.log(total);
    let limit = 10;
    setPageCount(Math.ceil(total / limit));
    setUsers(data);
  };
  const fetchPosts = async (currentPage) => {
    // const res = await fetch(`http://localhost:5000/users?_page=${currentPage}`);
    const res = await fetch(`http://localhost:5000/users`);
    const data = await res.json();
    return data;
  };
  const handlePageClick = async (data) => {
    console.log(data.selected);
    let currentPage = data.selected + 1;

    const postFormServer = await fetchPosts(currentPage);
    setUsers(postFormServer);
    setChangeCount(currentPage);
  };
  const handleNext = async () => {
    // alert(btnNext)
    if (counter !== 5) {
      setCounter(Number(counter) + 1);
      // counter<5 ? document.getElementById("next").disabled = false:document.getElementById("next").disabled = true
      // alert(counter)
      const postFormServer = await fetchPosts(counter);
      setUsers(postFormServer);
    }
  };
  const handlePrev = async () => {
    // alert(btnNext)
    if (counter !== 1) {
      setCounter(Number(counter) - 1);
      // alert(counter)
      const postFormServer = await fetchPosts(counter);
      setUsers(postFormServer);
    }
  };
  const handleDate = async (e, id) => {
    e.preventDefault();
    // alert(id)
    const res = await fetch(
      `http://localhost:5000/users?_sort=date&_order=asc&_page=1`
    );
    const data = await res.json();
    const total = res.headers.get("x-total-count");
    console.log(total);
    let limit = 10;
    setPageCount(Math.ceil(total / limit));
    setUsers(data);
  };
  const heading = [
    //  {"id":"name","label":"Name"},
    { id: "email", label: "Email" },
    { id: "phone", label: "Phone" },
    { id: "status", label: "Status" },
    { id: "add", label: "" },
    { id: "date", label: "Date Added" },
  ];

  const [selected, setSelected] = React.useState([]);
  const isSelected = (name) => selected.indexOf(name) !== -1;
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = users.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };
  console.log(selected.length);
  const handleClick2 = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
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
  };
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleInput = (e) => {
    setCounter(e.target.value);
  };
  console.log(counter);
  const handleBackButtonClick = (event) => {
    // onPageChange(event, page - 1);
    setPage(page - 1);
  };

  const handleNextButtonClick = (event) => {
    // onPageChange(event, page + 1);
    setPage(page + 1);
  };
  const handleFirstBackButtonClick = () => {
    setPage(0);
  };

  const handleLastNextButtonClick = () => {
    setPage(Math.max(0, Math.ceil(users.length / rowsPerPage) - 1));
  };
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("email");

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  return (
    <>
      <TableContainer sx={{ maxHeight: "100%" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={6}>
                <div
                  className="d-flex justify-content-between"
                  style={{ flexDirection: "row" }}
                >
                  <div className="">
                    <Search>
                      <SearchIconWrapper>
                        <SearchIcon />
                      </SearchIconWrapper>
                      <StyledInputBase
                        placeholder="Search Name"
                        onChange={handleSearch}
                        inputProps={{ "aria-label": "search" }}
                      />
                    </Search>
                  </div>
                  <div className="">
                    <Button
                      className="butt"
                      style={{
                        marginLeft: "5px",
                        backgroundColor: "transparent",
                        color: "gray",
                        border: "1px solid gray",
                      }}
                    >
                      View
                    </Button>
                    <Button
                      className="butt"
                      style={{
                        marginLeft: "5px",
                        backgroundColor: "transparent",
                        color: "gray",
                        border: "1px solid gray",
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      className="butt"
                      style={{
                        marginLeft: "5px",
                        backgroundColor: "transparent",
                        color: "gray",
                        border: "1px solid gray",
                      }}
                    >
                      Status
                      <KeyboardArrowDownIcon sx={{}} />
                    </Button>
                    <Button
                      className="butt"
                      style={{
                        marginLeft: "5px",
                        backgroundColor: "transparent",
                        color: "gray",
                        border: "1px solid gray",
                      }}
                    >
                      Send
                    </Button>
                    <Button
                      className="butt"
                      style={{
                        marginLeft: "5px",
                        backgroundColor: "transparent",
                        color: "gray",
                        border: "1px solid gray",
                      }}
                    >
                      <MoreHorizIcon />
                    </Button>
                    <Button
                      className="butt"
                      style={{
                        width: "0px",
                        background: "transparent",
                        color: "rgba(0,0,0,1)",
                        border: "none",
                      }}
                      disabled
                    >
                      |
                    </Button>
                    <Button
                      className="butt"
                      style={{
                        marginLeft: "5px",
                        backgroundColor: "transparent",
                        color: "gray",
                        border: "1px solid gray",
                      }}
                      id="prev"
                      disabled={page === 0}
                      // onClick={handlePrev}
                      onClick={handleBackButtonClick}
                      // onClick={handlePrev}
                    >
                      <ArrowBackIosNewIcon
                        sx={{ fontSize: "small", fontWeight: "bold" }}
                      />
                    </Button>
                    <Button
                      className="butt"
                      style={{
                        marginLeft: "5px",
                        backgroundColor: "transparent",
                        color: "gray",
                        border: "1px solid gray",
                      }}
                      disabled={
                        page >= Math.ceil(users.length / rowsPerPage) - 1
                      }
                      // onClick={handleNext}
                      onClick={(e) => handleNextButtonClick(e)}
                      // onClick={handleNext}
                    >
                      <ArrowForwardIosIcon
                        sx={{ fontSize: "small", fontWeight: "bold" }}
                      />
                    </Button>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>

      <TableContainer sx={{ maxHeight: "100%" }} stickyHeader>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  color: "gray",
                  border: "1px solid rgba(0,0,0,0.2)",
                  borderTop: "none",
                  padding: "0",
                }}
                style={{ minWidth: "350px" }}
              >
                <div
                  className="d-flex justify-content-between"
                  style={{ flexDireaction: "row" }}
                >
                  <div>
                    <Checkbox
                      padding="checkbox"
                      style={{ marginLeft: "25px" }}
                      onChange={handleSelectAllClick}
                      checked={
                        users.length > 0 && selected.length === users.length
                      }
                      indeterminate={
                        selected.length > 0 && selected.length < users.length
                      }
                      inputProps={{
                        "aria-label": "select all desserts",
                      }}
                    />
                    <span style={{ marginLeft: "15px" }}>Name</span>
                  </div>
                  <Button
                    className="btn"
                    disabled
                    style={{
                      marginLeft: "5px",
                      marginRight: "8px",
                      backgroundColor: "transparent",
                      color: "gray",
                      border: "none",
                    }}
                  >
                    <MoreHorizIcon />
                  </Button>
                </div>
              </TableCell>
              {heading.map((res) => (
                <TableCell
                  key={res.id}
                  sx={{ fontWeight: "bold", color: "gray" }}
                  style={{ minWidth: "150px" }}
                  // onClick={(e) => handleDate(e, res.id === "date")}
                  // onClick={(e) => handleDate(e, res.id === "date")}
                  sortDirection={orderBy === res.id ? order : false}
                >
                  {/* <span>{res.label}</span> */}
                  {/* */}
                  <TableSortLabel
                    active={orderBy === res.id}
                    direction={orderBy === res.id ? order : "asc"}
                    onClick={() => handleRequestSort(res.id)}
                  >
                    {res.label}
                    {/* {orderBy === res.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null} */}
                  </TableSortLabel>
                  {/* */}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .sort(getComparator(order, orderBy))
              .map((res) => {
                const isItemSelected = isSelected(res.name);
                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick2(event, res.name)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={res.name}
                    selected={isItemSelected}
                  >
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        color: "gray",
                        border: "1px solid rgba(0,0,0,0.2)",
                        borderTop: "none",
                        padding: "0",
                      }}
                    >
                      <div
                        className="d-flex justify-content-between"
                        style={{ flexDireaction: "row" }}
                      >
                        <div>
                          <Checkbox
                            padding="checkbox"
                            style={{ marginLeft: "25px" }}
                            onChange={(e) => handleClick2(e, res.name)}
                            checked={isItemSelected}
                          />
                          <span style={{ marginLeft: "15px" }}>{res.name}</span>
                        </div>
                        {/* <Button className="btnRow" style={{marginLeft:"5px",marginRight:"5px",backgroundColor:"transparent",color:"gray",}}><MoreHorizIcon /></Button> */}
                        <DropdownButton
                          title={<MoreHorizIcon />}
                          className="btnRow btn d-flex"
                          style={{
                            marginLeft: "5px",
                            marginRight: "5px",
                            backgroundColor: "transparent",
                            color: "gray",
                          }}
                        >
                          <Dropdown.Item href="#">Update status</Dropdown.Item>
                          <Dropdown.Item href="#">Send a message</Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Item href="#">View details</Dropdown.Item>
                          <Dropdown.Item href="#">Edit</Dropdown.Item>
                          <Dropdown.Item href="#">Copy</Dropdown.Item>
                          <Dropdown.Item href="#">Move</Dropdown.Item>
                          <Dropdown.Item href="#">Export</Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Item href="#" className="text-danger">
                            Delete
                          </Dropdown.Item>
                        </DropdownButton>
                      </div>
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "gray" }}>
                      <span>{res.email}</span>
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "gray" }}>
                      <span>{res.phone}</span>
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: "bold", color: `${res.color}` }}
                    >
                      <span>{res.status}</span>
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "gray" }}>
                      <span>{res.added}</span>
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "gray" }}>
                      <span>{res.date}</span>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <Table>
        <TableFooter sx={{ width: "100px" }}>
          <TableRow>
            <TableCell sx={{ padding: "0" }}>
              <div
                className="pt-2 pb-2 d-flex justify-content-center align-items-center"
                style={{ flexDirection: "row" }}
              >
                <Button
                  className="butt"
                  style={{
                    marginRight: "15px",
                    backgroundColor: "transparent",
                    color: "gray",
                    border: "1px solid gray",
                  }}
                  id="firstPrev"
                  disabled={page === 0}
                  // onClick={handlePrev}
                  onClick={handleFirstBackButtonClick}
                >
                  <FirstPageIcon
                    sx={{ fontSize: "small", fontWeight: "bold" }}
                  />
                </Button>

                <Button
                  className="butt"
                  style={{
                    marginRight: "15px",
                    backgroundColor: "transparent",
                    color: "gray",
                    border: "1px solid gray",
                  }}
                  id="prev"
                  disabled={page === 0}
                  // onClick={handlePrev}
                  onClick={handleBackButtonClick}
                >
                  <ArrowBackIosNewIcon
                    sx={{ fontSize: "small", fontWeight: "bold" }}
                  />
                </Button>
                <input
                  type="number"
                  className="form-control inputBox"
                  placeholder=""
                  // defaultValue={rowsPerPage}
                  value={rowsPerPage}
                  onChange={(e) => handleChangeRowsPerPage(e)}
                />
                <span
                  className="d-flex justify-content-center align-items-center fw-bold"
                  style={{
                    flexDirection: "row",
                    marginLeft: "8px",
                    marginRight: "8px",
                  }}
                >
                  {page * rowsPerPage + 1} - {(page + 1) * rowsPerPage}
                  {/* {page * rowsPerPage + rowsPerPage}  //second method */} of{" "}
                  {users.length}
                </span>
                <Button
                  className="butt"
                  id="next"
                  style={{
                    marginLeft: "5px",
                    backgroundColor: "transparent",
                    color: "gray",
                    border: "1px solid gray",
                  }}
                  disabled={page >= Math.ceil(users.length / rowsPerPage) - 1}
                  // onClick={handleNext}
                  onClick={(e) => handleNextButtonClick(e)}
                >
                  <ArrowForwardIosIcon
                    sx={{ fontSize: "small", fontWeight: "bold" }}
                  />
                </Button>

                <Button
                  className="butt"
                  id="lastNext"
                  style={{
                    marginLeft: "5px",
                    backgroundColor: "transparent",
                    color: "gray",
                    border: "1px solid gray",
                  }}
                  disabled={page >= Math.ceil(users.length / rowsPerPage) - 1}
                  // onClick={handleNext}
                  onClick={(e) => handleLastNextButtonClick(e)}
                >
                  <LastPageIcon
                    sx={{ fontSize: "small", fontWeight: "bold" }}
                  />
                </Button>
              </div>
            </TableCell>
          </TableRow>
          {/* <TableRow>
        <TableCell>
        <div className='d-flex align-items-center justify-content-center' style={{flexDirection:"row"}}>
        <ReactPaginate
            previousLabel={<Button className='butt' style={{marginRight:"35px",backgroundColor:"transparent",color:"gray",border:"1px solid gray"}}><ArrowBackIosNewIcon sx={{fontSize:"small",fontWeight:"bold"}}/></Button>}
            nextLabel={<Button className='butt' style={{marginLeft:"25px",backgroundColor:"transparent",color:"gray",border:"1px solid gray"}}><ArrowForwardIosIcon sx={{fontSize:"small",fontWeight:"bold"}}/></Button>}
            // breakLabel={'...'}
            // marginPagesDisplayed={2}
            // pageRangeDisplayed={3}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={'pagination justify-content-between align-items-center'}
            pageClassName={'page-item text-white'}
            // pageLinkClassName={'page-link'}
            previousClassName={'page-item'}
            nextClassName={'page-item'}
            previousLinkClassName={'page-link'}
            nextLinkClassName={'page-link'}
            breakClassName={'page-item'}
            breakLinkClassName={'page-link'}
            activeClassName={'active'}
            style={{color:"none",background:"transparents"}}
        />
        <div className='d-flex justify-content-center align-items-center' style={{flexDirection:"row", marginTop:"-18px", marginLeft:"-8.5%",zIndex:"1"}}>
        <input type="number" className="form-control inputBox" placeholder="" value={pageChangeCount}/>
        <span className='d-flex justify-content-center align-items-center fw-bold' style={{flexDirection:"row", marginLeft:"8px", marginRight:"8px",marginTop:"0"}}> of {pageCount}{counter}</span>
        </div>
        </div>
        </TableCell>
        </TableRow> */}
        </TableFooter>
      </Table>
      {/* <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage} 
        />*/}
    </>
  );
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
