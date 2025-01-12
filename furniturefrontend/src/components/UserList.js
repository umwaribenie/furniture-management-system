import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Pagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { getAllUsers, deleteUser } from '../services/apiService';
import AddUser from './AddUser';
import EditUser from './EditUser';
import * as XLSX from 'xlsx';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filters, setFilters] = useState({
    id: '',
    firstName: '',
    lastName: '',
    gender: '',
    username: '',
    email: '',
    phone: '',
    role: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllUsers(page - 1, rowsPerPage);
      setUsers(result.content || []);
      setTotalPages(result.totalPages);
    };
    fetchData();
  }, [page, rowsPerPage]);

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user.userId !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleAddUser = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  const handleUpdateUser = (updatedUser) => {
    setUsers(users.map((user) => (user.userId === updatedUser.userId ? updatedUser : user)));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleExportToExcel = () => {
    const dataToExport = users.map((user) => ({
      Id: user.userId,
      'First Name': user.firstName,
      'Last Name': user.lastName,
      Gender: user.gender,
      Username: user.username,
      Email: user.email,
      Phone: user.phone,
      Role: user.role,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');
    XLSX.writeFile(workbook, 'UserList.xlsx');
  };

  const filteredUsers = users.filter(
    (user) =>
      user.userId.toString().includes(filters.id) &&
      user.firstName.toLowerCase().includes(filters.firstName.toLowerCase()) &&
      user.lastName.toLowerCase().includes(filters.lastName.toLowerCase()) &&
      user.gender.toLowerCase().includes(filters.gender.toLowerCase()) &&
      user.username.toLowerCase().includes(filters.username.toLowerCase()) &&
      user.email.toLowerCase().includes(filters.email.toLowerCase()) &&
      user.phone.toLowerCase().includes(filters.phone.toLowerCase()) &&
      user.role.toLowerCase().includes(filters.role.toLowerCase())
  );

  const handlePageChange = (_, value) => setPage(value);
  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(e.target.value);
    setPage(1);
  };

  return (
    <div>
      <Box display="flex" justifyContent="space-between" mb={3}>
   
            <Button
                            variant="contained"
                            color="primary"
                            onClick={() => setIsAddModalOpen(true)}
                            sx={{ mb: 3, borderRadius: '8px', padding: '10px 20px', backgroundColor: '#5e35b1', '&:hover': { backgroundColor: '#512da8' }}}
                        >
                            Add User
                        </Button>
       
                       <Button
                           variant="contained"
                           color="success"
                           onClick={handleExportToExcel}
                           sx={{ mb: 3, ml: 2, borderRadius: '8px', padding: '10px 20px', backgroundColor: '#2e7d32', '&:hover': { backgroundColor: '#1b5e20' }}}
                       >
                           Export to Excel
                       </Button>
      </Box>

      <AddUser open={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAdd={handleAddUser} />
      <EditUser
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        userId={editingUserId}
        onUpdate={handleUpdateUser}
      />

      <TableContainer component={Paper} sx={{ mb: 4, boxShadow: 3, borderRadius: '12px', width: '130%', overflow: 'hidden' }}>
        <Table sx={{ backgroundColor: 'rgba(230, 239, 240, 0.67)' }}>
          <TableHead sx={{ backgroundColor: 'rgba(230, 239, 240, 0.67)' }}>
              <TableRow  >
                                                               <TableCell sx={{ fontWeight: 'bold', backgroundColor: 'rgba(230, 239, 240, 0.67)' }}>
                                                                   <TextField
                                                                       label="Search ID"
                                                                       name="id"
                                                                       variant="outlined"
                                                                       value={filters.id}
                                                                       onChange={handleFilterChange}
                                                                       fullWidth
                                                                       margin="dense"
                                                                       sx={{ borderRadius: '8px' }}
                                                                   />
                                                               </TableCell>
                                                               <TableCell sx={{ fontWeight: 'bold', backgroundColor: 'rgba(230, 239, 240, 0.67)' }}>
                                                                   <TextField
                                                                       label="Search firstName"
                                                                       name="firstName"
                                                                       variant="outlined"
                                                                       value={filters.firstName}
                                                                       onChange={handleFilterChange}
                                                                       fullWidth
                                                                       margin="dense"
                                                                       sx={{ borderRadius: '8px' }}
                                                                   />
                                                               </TableCell>
                                                               
                                                               
                                                               <TableCell sx={{ fontWeight: 'bold', color: '#424242' }}>
                                                                   <TextField
                                                                       label="Search lastName"
                                                                       name="lastName"
                                                                       variant="outlined"
                                                                       value={filters.lastName}
                                                                       onChange={handleFilterChange}
                                                                       fullWidth
                                                                       margin="dense"
                                                                       sx={{ borderRadius: '8px' }}
                                                                   />
                                                               </TableCell>
                                                               <TableCell sx={{ fontWeight: 'bold', color: '#424242' }}>
                                                                   <TextField
                                                                       label="Search gender"
                                                                       name="gender"
                                                                       variant="outlined"
                                                                       value={filters.gender}
                                                                       onChange={handleFilterChange}
                                                                       fullWidth
                                                                       margin="dense"
                                                                       sx={{ borderRadius: '8px' }}
                                                                   />
                                                               </TableCell>
                                                               <TableCell sx={{ fontWeight: 'bold', color: '#424242' }}>
                                                                   <TextField
                                                                       label="Search username"
                                                                       name="username"
                                                                       variant="outlined"
                                                                       value={filters.username}
                                                                       onChange={handleFilterChange}
                                                                       fullWidth
                                                                       margin="dense"
                                                                       sx={{ borderRadius: '8px' }}
                                                                   />
                                                               </TableCell>
                                                               <TableCell sx={{ fontWeight: 'bold', color: '#424242' }}>
                                                                   <TextField
                                                                       label="Search email"
                                                                       name="email"
                                                                       variant="outlined"
                                                                       value={filters.email}
                                                                       onChange={handleFilterChange}
                                                                       fullWidth
                                                                       margin="dense"
                                                                       sx={{ borderRadius: '8px' }}
                                                                   />
                                                               </TableCell>
                                                               <TableCell sx={{ fontWeight: 'bold', color: '#424242' }}>
                                                                   <TextField
                                                                       label="Search phone"
                                                                       name="phone"
                                                                       variant="outlined"
                                                                       value={filters.phone}
                                                                       onChange={handleFilterChange}
                                                                       fullWidth
                                                                       margin="dense"
                                                                       sx={{ borderRadius: '8px' }}
                                                                   />
                                                               </TableCell>
                                                               <TableCell sx={{ fontWeight: 'bold', color: '#424242' }}>
                                                                   <TextField
                                                                       label="Search role"
                                                                       name="role"
                                                                       variant="outlined"
                                                                       value={filters.role}
                                                                       onChange={handleFilterChange}
                                                                       fullWidth
                                                                       margin="dense"
                                                                       sx={{ borderRadius: '8px' }}
                                                                   />
                                                               </TableCell>
                                                           </TableRow>
                                                                  <TableRow sx={{ backgroundColor: '#9c27b0' }}>
                                                                                       {['User ID', 'First Name', 'Last Name', 'Gender', 'Username', 'Email','Phone' ,'Role'].map((header) => (
                                                                                           <TableCell key={header} sx={{ color: '#fff' }}>{header}</TableCell>
                                                                                       ))}
                                                                                       <TableCell align="center" sx={{ color: '#fff' }}>Actions</TableCell>
                                                                                   </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.userId}>
                <TableCell>{user.userId}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.gender}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell align="right">
                     <Box display="inline-flex" justifyContent="flex-start" alignItems="center">
                                                      
                  <Button
                    color="primary"
                    startIcon={<EditIcon />}
                    onClick={() => {
                      setEditingUserId(user.userId);
                      setIsEditModalOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    color="secondary"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(user.userId)}
                  >
                    Delete
                  </Button>
                    </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
        <FormControl variant="outlined" sx={{ minWidth: 120 }}>
          <InputLabel>Rows per page</InputLabel>
          <Select value={rowsPerPage} onChange={handleRowsPerPageChange} label="Rows per page">
            {[5, 10, 20].map((size) => (
              <MenuItem key={size} value={size}>
                {size}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Pagination count={totalPages} page={page} onChange={handlePageChange} color="primary" />
      </Box>
    </div>
  );
};

export default UserList;
