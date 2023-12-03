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
  Box,
  Modal,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Select,
  MenuItem,
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

const EcommerceUsers = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
    password: "",
    role: "",
  });

  const [isAddUserModalOpen, setAddUserModalOpen] = useState(false);

  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isUpdateUserModalOpen, setUpdateUserModalOpen] = useState(false);

  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [searchQuery, setSearchQuery] = useState("");

  const openAddUserModal = () => {
    setAddUserModalOpen(true);
  };

  const closeAddUserModal = () => {
    setAddUserModalOpen(false);
  };

  useEffect(() => {
    // Fetch data from your API when the component mounts
    axios
      .get("http://localhost:4000/v1/users", {
        params: {
          // page: currentPage, // Replace with your state variable for the current page
          sort: "DESC", // Change as needed
        },
      })
      .then((response) => {
        const allUsers = response.users;
        const startIndex = (currentPage - 1) * 10;
        const endIndex = startIndex + 10;
        const usersForCurrentPage = allUsers.slice(startIndex, endIndex);

        setUsers(usersForCurrentPage);
        const pages = (prev) =>
          prev > Math.ceil(allUsers.length / 10)
            ? prev
            : Math.ceil(allUsers.length / 10);
        setTotalPages(pages);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [currentPage]); // Empty dependency array ensures the effect runs once when the component mounts

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

  const createUser = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/v1/users",
        newUser
      );
      // Fetch
      const responseData = await axios.get("http://localhost:4000/v1/users", {
        params: {
          sort: "DESC",
        },
      });

      const allUsers = responseData.users;
      const startIndex = (currentPage - 1) * 10;
      const endIndex = startIndex + 10;
      const usersForCurrentPage = allUsers.slice(startIndex, endIndex);

      setUsers(usersForCurrentPage);
      const pages = (prev) =>
        prev > Math.ceil(allUsers.length / 10)
          ? prev
          : Math.ceil(allUsers.length / 10);
      setTotalPages(pages);
      closeAddUserModal();
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  //Update

  const openUpdateUserModal = (userId) => {
    setSelectedUserId(userId);
    setUpdateUserModalOpen(true);
  };

  const closeUpdateUserModal = () => {
    setSelectedUserId(null);
    setUpdateUserModalOpen(false);
  };

  const updateUser = async () => {
    try {
      const response = await axios.put(
        `http://localhost:4000/v1/users/${selectedUserId}`,
        newUser
      );
      const updatedUser = response.user;

      if (!updatedUser) {
        console.error("Error: Updated user data is undefined.");
        return;
      }
      // Fetch
      const updatedUsersResponse = await axios.get(
        "http://localhost:4000/v1/users",
        {
          params: {
            sort: "DESC",
          },
        }
      );
      const allUsers = updatedUsersResponse.users;
      const startIndex = (currentPage - 1) * 10;
      const endIndex = startIndex + 10;
      const usersForCurrentPage = allUsers.slice(startIndex, endIndex);

      setUsers(usersForCurrentPage);
      const pages = (prev) =>
        prev > Math.ceil(allUsers.length / 10)
          ? prev
          : Math.ceil(allUsers.length / 10);
      setTotalPages(pages);
      closeUpdateUserModal();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  //delete user
  const openDeleteDialog = (userId) => {
    setSelectedUserId(userId);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setSelectedUserId(null);
    setDeleteDialogOpen(false);
  };

  const confirmDeleteUser = async () => {
    try {
      // Perform the deletion logic using axios or any other method
      await axios.delete(`http://localhost:4000/v1/users/${selectedUserId}`);
      console.log(selectedUserId);
      // Fetch
      const updatedUsersResponse = await axios.get(
        "http://localhost:4000/v1/users",
        {
          params: {
            sort: "DESC",
          },
        }
      );

      const allUsers = updatedUsersResponse.users;
      const startIndex = (currentPage - 1) * 10;
      const endIndex = startIndex + 10;
      const usersForCurrentPage = allUsers.slice(startIndex, endIndex);

      setUsers(usersForCurrentPage);
      const pages = (prev) =>
        prev > Math.ceil(allUsers.length / 10)
          ? prev
          : Math.ceil(allUsers.length / 10);
      setTotalPages(pages);
      // Close the delete confirmation dialog
      closeDeleteDialog();
    } catch (error) {
      console.error("Error deleting user:", error);
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
        "http://localhost:4000/v1/users/search",
        {
          params: {
            query: searchQuery,
            page: currentPage, // Assuming you have currentPage in your state
            sort: "DESC", // Change as needed
          },
        }
      );

      const allUsers = response.users;
      const startIndex = (currentPage - 1) * 10;
      const endIndex = startIndex + 10;
      const usersForCurrentPage = allUsers.slice(startIndex, endIndex);

      setUsers(usersForCurrentPage);
      const pages = (prev) =>
        prev > Math.ceil(allUsers.length / 10)
          ? prev
          : Math.ceil(allUsers.length / 10);
      setTotalPages(pages);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div style={{ marginTop: "50px", padding: "80px" }}>
      <h1>Users List</h1>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {/* Add User Button */}

        <TextField
          label="Search"
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyPress={handleSearchKeyPress}
          style={{ marginBottom: "10px" }}
        />
        <Button
          variant="contained"
          style={{
            backgroundColor: "#7758ae",
            color: "#fff",
            marginBottom: "10px",
            marginTop: "10px",
          }}
          onClick={openAddUserModal}
        >
          + Add User
        </Button>
      </div>
      {/* Add User Modal */}
      <Dialog open={isAddUserModalOpen} onClose={closeAddUserModal} fullWidth>
        <DialogTitle style={{ height: "auto" }}>
          <h2
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#cccccc",
              borderRadius: "5px",
            }}
          >
            Add User
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
            value={newUser.firstName}
            onChange={handleInputChange}
            style={{ marginBottom: "5px", marginTop: "5px" }}
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={newUser.lastName}
            onChange={handleInputChange}
            style={{ marginBottom: "5px" }}
          />
          <TextField
            label="Email"
            name="email"
            value={newUser.email}
            onChange={handleInputChange}
            style={{ marginBottom: "5px" }}
          />
          <TextField
            label="Username"
            name="userName"
            value={newUser.userName}
            onChange={handleInputChange}
            style={{ marginBottom: "5px" }}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={newUser.password}
            onChange={handleInputChange}
            style={{ marginBottom: "5px" }}
          />
          <TextField
            label="Role"
            name="role"
            select
            value={newUser.role}
            onChange={handleInputChange}
            style={{ marginBottom: "5px" }}
          >
            {["admin", "manager"].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          {/* Add other fields as needed */}
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            style={{ backgroundColor: "#7758ae", color: "#fff" }}
            onClick={createUser}
          >
            Add User
          </Button>

          <Button onClick={closeAddUserModal} variant="contained" color="error">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Update User Modal */}

      <Dialog
        open={isUpdateUserModalOpen}
        onClose={closeUpdateUserModal}
        fullWidth
      >
        <DialogTitle style={{ height: "auto" }}>
          <h2
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#cccccc",
              borderRadius: "5px",
            }}
          >
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
            value={newUser.firstName}
            onChange={handleInputChange}
            style={{ marginBottom: "5px", marginTop: "5px" }}
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={newUser.lastName}
            onChange={handleInputChange}
            style={{ marginBottom: "5px" }}
          />
          <TextField
            label="Email"
            name="email"
            value={newUser.email}
            onChange={handleInputChange}
            style={{ marginBottom: "5px" }}
          />
          <TextField
            label="Username"
            name="userName"
            value={newUser.userName}
            onChange={handleInputChange}
            style={{ marginBottom: "5px" }}
          />
          <TextField
            label="Role"
            name="role"
            select
            value={newUser.role}
            onChange={handleInputChange}
            style={{ marginBottom: "5px" }}
          >
            {["admin", "manager"].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            style={{ backgroundColor: "#7758ae", color: "#fff" }}
            onClick={updateUser}
          >
            Update User
          </Button>
          <Button
            onClick={closeUpdateUserModal}
            variant="contained"
            color="error"
          >
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
            <br /> id : {selectedUserId}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDeleteUser} color="secondary">
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
              <TableCell style={{ fontWeight: 800 }}>Active</TableCell>
              {/* Add more table headers for other fields */}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {user.lastLogin === null
                    ? formatLastLogin(user.updatedAt)
                    : formatLastLogin(user.lastLogin)}
                </TableCell>
                <TableCell>
                  <IconButton
                    color="secondary"
                    onClick={() => openUpdateUserModal(user._id)}
                  >
                    <CreateSharp />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => openDeleteDialog(user._id)}
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

export default EcommerceUsers;
