import React, { useState, useEffect  } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box, MenuItem, FormControl, InputLabel, Select, Link, Alert } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Signup = () => {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        phone: '',
        username: '',
        email: '',
        password: '',
        role: ''
    });
        // Set the background image for the body element of this page only
        useEffect(() => {
            document.body.style.background = 'url(/chair.avif) no-repeat center center fixed';
            document.body.style.backgroundSize = 'cover';
    
            // Cleanup: remove the background image when the component is unmounted
            return () => {
                document.body.style.background = '';
            };
        }, []);


    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/user/signup', user);
            console.log('User registered successfully:', response.data);
            setMessage('User registered successfully.');
            setUser({
                firstName: '',
                lastName: '',
                gender: '',
                phone: '',
                username: '',
                email: '',
                password: '',
                role: ''
            }); // Reset form fields
        } catch (error) {
            setError('There was an error registering the user.');
            console.error('There was an error registering the user:', error);
        }
    };

    return (
        <div
        style={{ 
            background: 'url(/public/chair.avif) no-repeat center center fixed', 
            backgroundSize: 'cover',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
        }} >
        
        <Container
                style={{
                    marginTop: '300px',
                    padding: '20px',
                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    borderRadius: '15px',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
                    backdropFilter: 'blur(10px)',
                    width: '30%',
                    maxWidth: '800px',
                }}
            >
                <Box className="signup-box">
                <Typography
                        variant="h4"
                        align="center"
                        style={{
                            fontFamily: 'Verdana, sans-serif',
                            fontSize: '2.5rem',
                            fontWeight: 'bold',
                            color: '#6a1b9a',
                            textAlign: 'center',
                            marginBottom: '20px',
                            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
                        }}
                    >
                        Signup
                    </Typography>
                    {message && <Alert severity="success">{message}</Alert>}
                    {error && <Alert severity="error">{error}</Alert>}

                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="First Name"
                            name="firstName"
                            value={user.firstName}
                            onChange={handleChange}
                            margin="normal"
                            required
                            style={{
                                width: '100%',
                                padding: '10px',
                                marginBottom: '10px',
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                                fontSize: '1rem',
                                background: '#f9f9f9',
                            }}
                            
                        />
                        <TextField
                            fullWidth
                            label="Last Name"
                            name="lastName"
                            value={user.lastName}
                            onChange={handleChange}
                            margin="normal"
                            required
                            style={{
                                width: '100%',
                                padding: '10px',
                                marginBottom: '10px',
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                                fontSize: '1rem',
                                background: '#f9f9f9',
                            }}
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="gender-label">Gender</InputLabel>
                            <Select
                                labelId="gender-label"
                                name="gender"
                                value={user.gender}
                                onChange={handleChange}
                                required
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    marginBottom: '10px',
                                    border: '1px solid #ccc',
                                    borderRadius: '8px',
                                    fontSize: '1rem',
                                    background: '#f9f9f9',
                                }}
                            >
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            fullWidth
                            label="Phone"
                            name="phone"
                            value={user.phone}
                            onChange={handleChange}
                            margin="normal"
                            required
                            style={{
                                width: '100%',
                                padding: '10px',
                                marginBottom: '10px',
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                                fontSize: '1rem',
                                background: '#f9f9f9',
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Username"
                            name="username"
                            value={user.username}
                            onChange={handleChange}
                            margin="normal"
                            required
                            style={{
                                width: '100%',
                                padding: '10px',
                                marginBottom: '10px',
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                                fontSize: '1rem',
                                background: '#f9f9f9',
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            margin="normal"
                            required
                            style={{
                                width: '100%',
                                padding: '10px',
                                marginBottom: '10px',
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                                fontSize: '1rem',
                                background: '#f9f9f9',
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            name="password"
                            type="password"
                            value={user.password}
                            onChange={handleChange}
                            margin="normal"
                            required
                            style={{
                                width: '100%',
                                padding: '10px',
                                marginBottom: '10px',
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                                fontSize: '1rem',
                                background: '#f9f9f9',
                            }}
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="role-label">Role</InputLabel>
                            <Select
                                labelId="role-label"
                                name="role"
                                value={user.role}
                                onChange={handleChange}
                                required
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    marginBottom: '10px',
                                    border: '1px solid #ccc',
                                    borderRadius: '8px',
                                    fontSize: '1rem',
                                    background: '#f9f9f9',
                                }}
                            >
                                <MenuItem value="Salesperson">Salesperson</MenuItem>
                                <MenuItem value="Manager">Manager</MenuItem>
                            
                            </Select>
                        </FormControl>
                        <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                type="submit"
                                style={{
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
                                }}
                            >
                                SignUp
                            </Button>
                    </form>

                    </Box>
                    <Box mt={2} textAlign="center">
                        <Link
                            component={RouterLink}
                            to="/login"
                            style={{
                                textDecoration: 'none',
                                color: '#6a1b9a',
                                textAlign: 'center',
                                display: 'block',
                                marginTop: '10px',
                                transition: 'color 0.3s ease',
                            }}
                        >
                            Login
                        </Link>
                    </Box>
                    <Box mt={2} textAlign="center">
                        <Link
                            component={RouterLink}
                            to="/forgot-password"
                            style={{
                                textDecoration: 'none',
                                color: '#6a1b9a',
                                textAlign: 'center',
                                display: 'block',
                                marginTop: '10px',
                                transition: 'color 0.3s ease',
                            }}
                        >
                            Forgot Password?
                        </Link>
                    </Box>
               
            </Container>
        </div>
    );
};

export default Signup;
