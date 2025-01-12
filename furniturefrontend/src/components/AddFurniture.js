import React, { useState, useEffect } from 'react';
import { postFurniture } from '../services/apiService';
import { Modal, Box, TextField, Button, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const AddFurniture = ({ open, onClose, onAdd }) => {
    const [furniture, setFurniture] = useState({
        furnitureName: '',
        price: '',
        quantity: '',
        description: '',
    });

    useEffect(() => {
        if (open) {
            setFurniture({
                furnitureName: '',
                price: '',
                quantity: '',
                description: '',
            });
        }
    }, [open]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFurniture((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newFurniture = await postFurniture(furniture);
            onAdd(newFurniture);
            onClose();
        } catch (error) {
            console.error("Error posting furniture:", error);
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
                        color: '#6a1b9a',  // Close icon color
                    }}
                >
                    <CloseIcon />
                </IconButton>
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
                    Add Furniture
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        name="furnitureName"
                        label="Furniture Name"
                        value={furniture.furnitureName}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                        sx={inputStyle}
                    />
                    <TextField
                        name="price"
                        label="Price"
                        type="number"
                        value={furniture.price}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                        sx={inputStyle}
                    />
                    <TextField
                        name="quantity"
                        label="Quantity"
                        type="number"
                        value={furniture.quantity}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                        sx={inputStyle}
                    />
                    <TextField
                        name="description"
                        label="Description"
                        value={furniture.description}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                        sx={inputStyle}
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
                        Save
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
    border: '2px solid #6a1b9a', // Purple border
    borderRadius: '8px', // Rounded corners
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};

const inputStyle = {
    '& .MuiInputLabel-root': { color: '#6a1b9a' }, // Label color
    '& .MuiInputLabel-root.Mui-focused': { color: '#6a1b9a' }, // Label color on focus
    '& .MuiOutlinedInput-root': {
        '& fieldset': { borderColor: '#ccc' }, // Default border color
        '&:hover fieldset': { borderColor: '#6a1b9a' }, // Border color on hover
        '&.Mui-focused fieldset': { borderColor: '#6a1b9a' }, // Border color when focused
    },
};

export default AddFurniture;
    