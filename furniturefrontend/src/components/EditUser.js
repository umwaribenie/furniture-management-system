import React, { useState, useEffect } from 'react';
import { getUserById, updateUser } from '../services/apiService';
import { Modal, Box, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem, IconButton, Alert } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';

const EditUser = ({ open, onClose, userId, onUpdate }) => {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        phone: '',
        username: '',
        email: '',
        role: '',
    });
    const [error, setError] = useState(''); // State for error handling

    useEffect(() => {
        const fetchUser = async () => {
            if (userId) {
                try {
                    const fetchedUser = await getUserById(userId);
                    setUser(fetchedUser);
                } catch (error) {
                    console.error("Error fetching user:", error);
                    setError('Failed to fetch user data. Please try again.');
                }
            }
        };
        fetchUser();
    }, [userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check for invalid input
        if (!user.firstName || !user.lastName || !user.email || !user.phone || !user.username) {
            setError('All fields must be filled out');
            return;
        }

        setError(''); // Clear error if validation passes
        try {
            const updatedUser = await updateUser(userId, user);
            onUpdate(updatedUser);
            onClose();
        } catch (error) {
            console.error("Error updating user:", error);
            setError('Failed to update user. Please try again.');
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={modalStyle}>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: '#6a1b9a',
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <Typography variant="h4" align="center" sx={modalTitleStyle}>
                    Edit User
                </Typography>
                {error && <Alert severity="error">{error}</Alert>}
                <form onSubmit={handleSubmit}>
                    <TextField
                        name="firstName"
                        label="First Name"
                        value={user.firstName}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                        sx={inputStyle}
                    />
                    <TextField
                        name="lastName"
                        label="Last Name"
                        value={user.lastName}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                        sx={inputStyle}
                    />
                    <FormControl fullWidth margin="normal" required sx={inputStyle}>
                        <InputLabel id="gender-label">Gender</InputLabel>
                        <Select
                            labelId="gender-label"
                            name="gender"
                            value={user.gender}
                            onChange={handleChange}
                        >
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        name="phone"
                        label="Phone"
                        value={user.phone}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                        sx={inputStyle}
                    />
                    <TextField
                        name="username"
                        label="Username"
                        value={user.username}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                        sx={inputStyle}
                    />
                    <TextField
                        name="email"
                        label="Email"
                        value={user.email}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                        sx={inputStyle}
                    />
                    <FormControl fullWidth margin="normal" required sx={inputStyle}>
                        <InputLabel id="role-label">Role</InputLabel>
                        <Select
                            labelId="role-label"
                            name="role"
                            value={user.role}
                            onChange={handleChange}
                        >
                            <MenuItem value="Admin">Admin</MenuItem>
                            <MenuItem value="Accountant">Accountant</MenuItem>
                            <MenuItem value="Financier">Financier</MenuItem>
                            <MenuItem value="Manager">Manager</MenuItem>
                        </Select>
                    </FormControl>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={submitButtonStyle}
                    >
                        Update User
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'white',
    border: '2px solid #6a1b9a',
    borderRadius: '8px',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};

const modalTitleStyle = {
    fontFamily: 'Verdana, sans-serif',
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#6a1b9a',
    textAlign: 'center',
    marginBottom: '20px',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
};

const inputStyle = {
    '& .MuiInputLabel-root': { color: '#6a1b9a' },
    '& .MuiInputLabel-root.Mui-focused': { color: '#6a1b9a' },
    '& .MuiOutlinedInput-root': {
        '& fieldset': { borderColor: '#ccc' },
        '&:hover fieldset': { borderColor: '#6a1b9a' },
        '&.Mui-focused fieldset': { borderColor: '#6a1b9a' },
    },
};

const submitButtonStyle = {
    width: '50%',
    backgroundColor: '#6a1b9a',
    color: 'white',
    fontSize: '0.9rem',
    padding: '8px 12px',
    borderRadius: '8px',
    margin: '10px auto',
    display: 'block',
    transition: 'background-color 0.3s ease',
    cursor: 'pointer',
};

export default EditUser;
