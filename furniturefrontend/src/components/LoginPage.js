import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box, Alert, Link } from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';


const LoginPage = ({ onLogin }) => {
    const [otpEmail, setOtpEmail] = useState('');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    
    // Set the background image for the body element of this page only
    useEffect(() => {
        document.body.style.background = 'url(/chair.avif) no-repeat center center fixed';
        document.body.style.backgroundSize = 'cover';

        // Cleanup: remove the background image when the component is unmounted
        return () => {
            document.body.style.background = '';
        };
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'otpEmail':
                setOtpEmail(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'otp':
                setOtp(value);
                break;
            case 'password':
                setPassword(value);
                break;
            default:
                break;
        }
    };

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setMessage(null);
        setError(null);
        try {
            await axios.post('http://localhost:8080/api/user/send-otp-login', null, { params: { otpEmail } });
            setMessage('OTP sent successfully. Please check your email.');
        } catch (error) {
            setError('Failed to send OTP. Please try again.');
            console.error('Error sending OTP:', error);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const response = await axios.post('http://localhost:8080/api/user/login', null, {
                params: { email, otpEmail, otp, password }
            });
            setMessage('Login successful! Redirecting...');
            onLogin(response.data);
            setTimeout(() => navigate('/'), 0);
        } catch (error) {
            setError('Login failed. Please check your credentials and try again.');
            console.error('Error logging in:', error);
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
            }}
        >
            <Container
                style={{
                    padding: '20px',
                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    borderRadius: '15px',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
                    backdropFilter: 'blur(10px)',
                    width: '30%',
                    maxWidth: '800px',
                }}
            >
                <Box className="login-box">
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
                        Login
                    </Typography>
                    {message && <Alert severity="success">{message}</Alert>}
                    {error && <Alert severity="error">{error}</Alert>}

                    {/* Send OTP Form */}
                    <Box mb={3}>
                        <form onSubmit={handleSendOtp}>
                            <TextField
                                fullWidth
                                label="OTP Email"
                                name="otpEmail"
                                value={otpEmail}
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
                                Send OTP
                            </Button>
                        </form>
                    </Box>

                    {/* Login Form */}
                    <Box>
                        <form onSubmit={handleLogin}>
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                value={email}
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
                                label="OTP"
                                name="otp"
                                value={otp}
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
                                type="password"
                                name="password"
                                value={password}
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
                                Login
                            </Button>
                        </form>
                    </Box>
                    <Box mt={2} textAlign="center">
                        <Link
                            component={RouterLink}
                            to="/signup"
                            style={{
                                textDecoration: 'none',
                                color: '#6a1b9a',
                                textAlign: 'center',
                                display: 'block',
                                marginTop: '10px',
                                transition: 'color 0.3s ease',
                            }}
                        >
                            Sign Up
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
                </Box>
            </Container>
        </div>
    );
};

export default LoginPage;