import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, Navigate, useLocation } from 'react-router-dom';
import theme from './theme';
import LoginPage from './components/LoginPage'; 
import SalePage from './components/SalePage';
import UserPage from './components/UserPage';
import FurniturePage from './components/FurniturePage';
import Chart from './components/Chart';
import Stats from './components/Stats';
import Signup from './components/Signup';  
import ForgotPassword from './components/ForgotPassword';
import TextField from '@mui/material/TextField';

import GlobalSearchModal from './components/GlobalSearchModal';  

const App = () => {
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
    const [results, setResults] = useState({});
    const [role, setRole] = useState(null);

    const handleOpenSearchModal = () => setIsSearchModalOpen(true);
    const handleCloseSearchModal = () => setIsSearchModalOpen(false);

    useEffect(() => {
        const userRole = localStorage.getItem('role');
        setRole(userRole);
    }, []);

    const handleLogin = (userData) => {
        localStorage.setItem('role', userData.role);
        setRole(userData.role);
    };

    // Use useLocation inside the Router context
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Box sx={{ display: 'flex' }}>
                    <AppWithSidebar role={role} handleOpenSearchModal={handleOpenSearchModal} />

                    <Box sx={{ flexGrow: 1, padding: '20px' }}>
                        <GlobalSearchModal
                            open={isSearchModalOpen}
                            onClose={handleCloseSearchModal}
                            results={results}
                            setResults={setResults}
                        />
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    role ? (
                                        <>
                                     
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
                                Dashboard
                            </Typography>
                                          
                                            <Stats />
                                            <Typography
                                                variant="h4"
                                                align="center"
                                                style={{
                                                    fontFamily: 'Verdana, sans-serif',
                                                    fontSize: '2.0rem',
                                                    fontWeight: 'bold',
                                                    color: '#6a1b9a',
                                                    textAlign: 'center',
                                                    marginTop: '30px',
                                                    marginBottom: '10px',
                                                    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
                                                }}
                                            >
                                Sales Graph
                            </Typography>
                                            <Chart />
                                        </>
                                    ) : (
                                        <Navigate to="/login" />
                                    )
                                }
                            />
                            <Route path="/sales" element={role ? <SalePage /> : <Navigate to="/login" />} />
                            <Route path="/users" element={role === 'Admin' ? <UserPage /> : <Navigate to="/login" />} />
                            <Route path="/furnitures" element={role ? <FurniturePage /> : <Navigate to="/login" />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
                            <Route path="/forgot-password" element={<ForgotPassword />} />
                            <Route path="*" element={<Navigate to="/login" />} />
                        </Routes>
                    </Box>
                </Box>
            </Router>
        </ThemeProvider>
    );
};

const AppWithSidebar = ({ role, handleOpenSearchModal }) => {
    const location = useLocation();
    const isLoginPage = location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/forgot-password';

    return !isLoginPage && (
        <Box 
            sx={{
                width: '250px',
                backgroundColor: '#6a1b9a',
                color: 'white',
                height: '100vh',
                paddingTop: '20px',
                paddingLeft: '15px',
                paddingRight: '15px',
            }}
        >
            <Typography 
                variant="h6" 
                sx={{ 
                    marginBottom: '40px', 
                    fontFamily: 'Arial, sans-serif',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '1.4rem',
                    textAlign: 'center',
                    letterSpacing: '0.5px',
                }}
            >
                Furniture Mgt System
            </Typography>

            <Box sx={{ marginBottom: '20px' }}>
                <TextField
                    variant="outlined"
                    placeholder="Search..."
                    fullWidth
                    sx={{
                        backgroundColor: 'white',
                        borderRadius: '4px',
                        input: { padding: '10px' },
                    }}
                    onClick={handleOpenSearchModal}
                />
            </Box>

            {(role === 'Admin' || role === 'Salesperson' || role === 'Manager') && (
                <>
                <Button sx={{ fontSize: '1rem', color: 'white', width: '100%' }} component={Link} to="/">
                Dashboard
            </Button>
                    <Button sx={{ fontSize: '1rem', color: 'white', width: '100%' }} component={Link} to="/furnitures">
                        Furnitures
                    </Button>
                    <Button sx={{ fontSize: '1rem', color: 'white', width: '100%' }} component={Link} to="/sales">
                        Sales
                    </Button>
                </>
            )}

            {role === 'Admin' && (
                <Button sx={{ fontSize: '1rem', color: 'white', width: '100%' }} component={Link} to="/users">
                    Users
                </Button>
            )}

            <LogoutButton />
        </Box>
    );
};

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('role');
        navigate('/login');
    };

    return (
        <Button 
            color='white' 
            onClick={handleLogout}
            sx={{ fontSize: '1rem', width: '100%', mt: 2,bgcolor:'red', marginTop: '400px' }}
        >
            Logout
        </Button>
    );
};

export default App;
