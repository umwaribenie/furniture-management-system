import React, { useState, useEffect } from 'react';
import { getFurnitureById, updateFurniture } from '../services/apiService';
import { Modal, Box, TextField, Button, Typography, IconButton, Alert } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const EditFurniture = ({ open, onClose, furnitureId, onUpdate }) => {
    const [furniture, setFurniture] = useState({
        furnitureName: '',
        price: '',
        quantity: '',
        description: '',
    });
    const [error, setError] = useState(''); // State for error handling

    useEffect(() => {
        const fetchFurniture = async () => {
            if (furnitureId) {
                try {
                    const fetchedFurniture = await getFurnitureById(furnitureId);
                    setFurniture(fetchedFurniture);
                } catch (error) {
                    console.error("Error fetching furniture:", error);
                    setError('Failed to fetch furniture data. Please try again.');
                }
            }
        };
        fetchFurniture();
    }, [furnitureId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFurniture((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check for invalid input
        if (parseInt(furniture.quantity) < 0 || parseInt(furniture.price) < 0) {
            setError('Price and quantity must be positive values');
            return;
        }

        setError(''); // Clear error if validation passes
        try {
            const updatedFurniture = await updateFurniture(furnitureId, furniture);
            onUpdate(updatedFurniture);
            onClose();
        } catch (error) {
            console.error("Error updating furniture:", error);
            setError('Failed to update furniture. Please try again.');
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
                    Edit Furniture
                </Typography>
                {error && <Alert severity="error">{error}</Alert>}
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
                        type="submit"
                        variant="contained"
                        color="primary"
                        
                        sx={submitButtonStyle}
                    >
                        Update Furniture
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

export default EditFurniture;
