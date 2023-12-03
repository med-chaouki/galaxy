import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import {
  CheckCircleOutline,
  CancelOutlined,
  Delete,
  Update,
  CreateSharp,
  ArrowLeft,
  ArrowRight,
} from "@mui/icons-material";
const EcommerceCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [isUpdateDialogOpen, setUpdateDialogOpen] = useState(false);

  const [updatedCustomer, setUpdatedCustomer] = useState({
    firstName: "",
    lastName: "",
    email: "",
    // validAccount: true,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetch data from your API when the component mounts
    axios
      .get("http://localhost:4000/v1/customers", {
        params: {
          sort: "DESC",
        },
      })
      .then((response) => {
        const allCustomers = response.customers;
        const startIndex = (currentPage - 1) * 10;
        const endIndex = startIndex + 10;
        const customersForCurrentPage = allCustomers.slice(
          startIndex,
          endIndex
        );
        setCustomers(customersForCurrentPage);
        const pages = (prev) =>
          prev > Math.ceil(allCustomers.length / 10)
            ? prev
            : Math.ceil(allCustomers.length / 10);
        setTotalPages(pages);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Format the last login date
  const formatLastLogin = (lastLogin) => {
    const date = new Date(lastLogin);

    // Get day, month, and year
    const day = date.getDate();
    const month = date.getMonth() + 1; // Month is zero-based, so add 1
    const year = date.getFullYear();

    // Format as "day/month/year"
    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
  };

  //delete user
  const openDeleteDialog = (userId) => {
    setSelectedCustomerId(userId);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setSelectedCustomerId(null);
    setDeleteDialogOpen(false);
  };

  const confirmDeleteCustomer = async () => {
    try {
      // Perform the deletion logic using axios or any other method
      await axios.delete(
        `http://localhost:4000/v1/customers/${selectedCustomerId}`
      );
      // Fetch
      const customerResponse = await axios.get(
        "http://localhost:4000/v1/customers",
        {
          params: {
            sort: "DESC",
          },
        }
      );
      const allCustomers = customerResponse.customers;
      const startIndex = (currentPage - 1) * 10;
      const endIndex = startIndex + 10;
      const customersForCurrentPage = allCustomers.slice(startIndex, endIndex);
      setCustomers(customersForCurrentPage);
      const pages = (prev) =>
        prev > Math.ceil(allCustomers.length / 10)
          ? prev
          : Math.ceil(allCustomers.length / 10);
      setTotalPages(pages);
      closeDeleteDialog();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  //update

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCustomer((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const openUpdateDialog = (userId) => {
    setSelectedCustomerId(userId);
    setUpdateDialogOpen(true);
  };

  const closeUpdateDialog = () => {
    setSelectedCustomerId(null);
    setUpdateDialogOpen(false);
  };

  const confirmUpdateCustomer = async () => {
    try {
      await axios.put(
        `http://localhost:4000/v1/customers/${selectedCustomerId}`,
        updatedCustomer
      );

      // Fetch updated data
      const customerResponse = await axios.get(
        "http://localhost:4000/v1/customers",
        {
          params: {
            sort: "DESC",
          },
        }
      );
      const allCustomers = customerResponse.customers;
      const startIndex = (currentPage - 1) * 10;
      const endIndex = startIndex + 10;
      const customersForCurrentPage = allCustomers.slice(startIndex, endIndex);
      setCustomers(customersForCurrentPage);
      const pages = (prev) =>
        prev > Math.ceil(allCustomers.length / 10)
          ? prev
          : Math.ceil(allCustomers.length / 10);
      setTotalPages(pages);

      // Close the update confirmation dialog
      closeUpdateDialog();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  //Search

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === "Enter") {
      userSearch();
    }
  };

  const userSearch = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/v1/customers/search",
        {
          params: {
            query: searchQuery,
            page: currentPage, // Assuming you have currentPage in your state
            sort: "DESC", // Change as needed
          },
        }
      );

      const allCustomers = response.customers;
      const startIndex = (currentPage - 1) * 10;
      const endIndex = startIndex + 10;
      const usersForCurrentPage = allCustomers.slice(startIndex, endIndex);

      setCustomers(usersForCurrentPage);
      const pages = (prev) =>
        prev > Math.ceil(allCustomers.length / 10)
          ? prev
          : Math.ceil(allCustomers.length / 10);
      setTotalPages(pages);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div style={{ marginTop: "50px", padding: "80px" }}>
      <h1>Customer List</h1>

      <TextField
        label="Search"
        value={searchQuery}
        onChange={handleSearchChange}
        onKeyPress={handleSearchKeyPress}
        style={{ marginBottom: "10px" }}
      />

      {/* update dialog */}
      <Dialog open={isUpdateDialogOpen} onClose={closeUpdateDialog} fullWidth>
        <DialogTitle style={{ height: "auto" }}>
          <h2
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#cccccc",
              borderRadius: "5px",
            }}
          >
            {" "}
            Update User
          </h2>
        </DialogTitle>
        <DialogContent
          style={{
            display: "flex",
            flexDirection: "column",
            height: "auto",
            overflowY: "auto",
          }}
        >
          <TextField
            label="First Name"
            name="firstName"
            value={updatedCustomer.firstName}
            onChange={handleInputChange}
            style={{ marginBottom: "5px", marginTop: "5px" }}
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={updatedCustomer.lastName}
            onChange={handleInputChange}
            style={{ marginBottom: "5px" }}
          />
          <TextField
            label="Email"
            name="email"
            value={updatedCustomer.email}
            onChange={handleInputChange}
            style={{ marginBottom: "5px" }}
          />
          {/* Add more fields as needed */}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={confirmUpdateCustomer}
            variant="contained"
            style={{ backgroundColor: "#7758ae", color: "#fff" }}
          >
            Update
          </Button>
          <Button onClick={closeUpdateDialog} variant="contained" color="error">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* delete  */}
      <Dialog open={isDeleteDialogOpen} onClose={closeDeleteDialog}>
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user?
            <br /> id : {selectedCustomerId}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="error">
            Cancel
          </Button>
          <Button onClick={confirmDeleteCustomer} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: 800 }}>First Name</TableCell>
              <TableCell style={{ fontWeight: 800 }}>Last Name </TableCell>
              <TableCell style={{ fontWeight: 800 }}>Email</TableCell>
              <TableCell style={{ fontWeight: 800 }}>last Login</TableCell>
              <TableCell style={{ fontWeight: 800 }}>Is valid</TableCell>
              <TableCell style={{ fontWeight: 800 }}>Active</TableCell>
              {/* Add more table headers for other fields */}
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer._id}>
                <TableCell>{customer.firstName}</TableCell>
                <TableCell>{customer.lastName}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{formatLastLogin(customer.lastLogin)}</TableCell>
                <TableCell>
                  {customer.validAccount ? (
                    <IconButton color="secondary">
                      <CheckCircleOutline />
                    </IconButton>
                  ) : (
                    <IconButton color="error">
                      <CancelOutlined />
                    </IconButton>
                  )}
                </TableCell>
                <TableCell>
                  <IconButton
                    color="secondary"
                    onClick={() => openUpdateDialog(customer._id)}
                  >
                    <CreateSharp />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => openDeleteDialog(customer._id)} // handleDeleteDialogDelete
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Pagination Controls */}
      <div style={{ marginTop: "20px" }}>
        <Button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          variant="contained"
          style={{ backgroundColor: "#7758ae", color: "#fff" }}
        >
          <ArrowLeft />
        </Button>

        <span style={{ margin: "0 10px" }}>
          Page {currentPage} of {totalPages}
        </span>

        <Button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          style={{ backgroundColor: "#7758ae", color: "#fff" }}
        >
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default EcommerceCustomers;
