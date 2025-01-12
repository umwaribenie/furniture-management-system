import React, { useState, useEffect   } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box, Link, Alert } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';


const ForgotPassword = () => {
    const [otpEmail, setOtpEmail] = useState('');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

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
            case 'newPassword':
                setNewPassword(value);
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
            const response = await axios.post('http://localhost:8080/api/user/send-otp', null, {
                params: { otpEmail }
            });
            setMessage('OTP sent to email.');
        } catch (error) {
            setError('Error sending OTP.');
            console.error('Error sending OTP:', error);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            await axios.put('http://localhost:8080/api/user/reset-password', null, {
                params: { email, otpEmail, otp, newPassword }
            });
            setMessage('Password has been reset successfully.');
            setOtpEmail('');
            setEmail('');
            setOtp('');
            setNewPassword('');
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setError(error.response.data);
            } else {
                setError('Error resetting password.');
            }
            console.error('Error resetting password:', error);
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
                               padding: '20px',
                               backgroundColor: 'rgba(255, 255, 255, 0.5)',
                               borderRadius: '15px',
                               boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
                               backdropFilter: 'blur(10px)',
                               width: '30%',
                               maxWidth: '800px',
                           }}
                       >
                <Box className="forgot-password-box">
       
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
                        Forgot Password
                    </Typography>
                    {message && <Alert severity="success">{message}</Alert>}
                    {error && <Alert severity="error">{error}</Alert>}

                    <Box mb={5}>
                   
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

                    <Box>
                
                        <form onSubmit={handleResetPassword}>
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
                                label="New Password"
                                name="newPassword"
                                type="password"
                                value={newPassword}
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
                            >     Reset Password
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
                </Box>
            </Container>
        </div>
    );
};

export default ForgotPassword;
