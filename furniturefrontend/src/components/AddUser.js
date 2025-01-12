import React, { useState, useEffect } from 'react';
import { postUser } from '../services/apiService'; 
import { Modal, Box, TextField, Button, Typography, MenuItem, Select, FormControl, InputLabel, IconButton, Alert } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

const AddUser = ({ open, onClose, onAdd }) => {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        phone: '',
        username: '',
        email: '',
        password: '',
        role: '',
    });
    const [error, setError] = useState('');

    useEffect(() => {
        if (open) {
            setUser({
                firstName: '',
                lastName: '',
                gender: '',
                phone: '',
                username: '',
                email: '',
                password: '',
                role: '',
            });
            setError('');
        }
    }, [open]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newUser = await postUser(user);
            onAdd(newUser);
            onClose();
        } catch (error) {
            console.error("Error posting user:", error);
            setError('Failed to add user. Please try again.');
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
                        color: '#6a1b9a'
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <Typography variant="h4" align="center" sx={modalTitleStyle}>
                    Add User
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
                    <FormControl fullWidth margin="normal" required>
                        <InputLabel>Gender</InputLabel>
                        <Select
                            name="gender"
                            value={user.gender}
                            onChange={handleChange}
                            label="Gender"
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
                    <TextField
                        name="password"
                        type="password"
                        label="Password"
                        value={user.password}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                        sx={inputStyle}
                    />
                    <FormControl fullWidth margin="normal" required>
                        <InputLabel>Role</InputLabel>
                        <Select
                            name="role"
                            value={user.role}
                            onChange={handleChange}
                            label="Role"
                        >
                            <MenuItem value="Admin">Admin</MenuItem>
                            <MenuItem value="Salesperson">Salesperson</MenuItem>
                            <MenuItem value="Manager">Manager</MenuItem>
                        </Select>
                    </FormControl>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                       
                        sx={submitButtonStyle}
                    >
                        Add User
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
    maxHeight: 870, 
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

export default AddUser;
