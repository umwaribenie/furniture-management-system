import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#6a1b9a',
        },
        secondary: {
            main: '#f44336', 
        },
        background: {
            default: 'rgba(230, 239, 240, 0.67)',
        },
    },
    typography: {
        h1: {
            fontFamily: 'Roboto, sans-serif',
            fontWeight: 700,
            fontSize: '3rem',
            color: '#333',
        },
        h2: {
            fontFamily: 'Roboto, sans-serif',
            fontWeight: 500,
            fontSize: '2rem',
            color: '#333',
        },
        body1: {
            fontFamily: 'Roboto, sans-serif',
            fontSize: '1rem',
            color: '#555',
        },
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiInputLabel-root': { color: '#6a1b9a' }, // Default label color
                    '& .MuiInputLabel-root.Mui-focused': { color: '#6a1b9a' }, // Label color when focused
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: '#ccc', // Default border color
                        },
                        '&:hover fieldset': {
                            borderColor: '#6a1b9a', // Border color on hover
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#6a1b9a', // Border color when focused
                        },
                    },
                },
            },
        },
        MuiFormControl: {
            styleOverrides: {
                root: {
                    marginBottom: '10px', // Space between form controls
                    '& .MuiInputLabel-root': {
                        color: '#6a1b9a', // Label color
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                        color: '#6a1b9a', // Focused label color
                    },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: '#ccc', // Default border color
                        },
                        '&:hover fieldset': {
                            borderColor: '#6a1b9a', // Hover border color
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#6a1b9a', // Focused border color
                        },
                    },
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                root: {
                    padding: '10px',
                    background: '#f9f9f9', // Background color
                    borderRadius: '8px',
                    fontSize: '1rem',
                },
                icon: {
                    color: '#6a1b9a', // Arrow color
                },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    '&.Mui-selected': {
                        backgroundColor: '#6a1b9a', // Background color when selected
                        color: '#fff', // Text color when selected
                    },
                    '&.Mui-selected:hover': {
                        backgroundColor: '#7b1fa2', // Darker color on hover
                    },
                },
            },
        },
    },
});

export default theme;
