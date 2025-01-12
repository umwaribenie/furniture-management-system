import React, { useState, useEffect } from 'react';
import { postSale, getNonPaginatedFurnitures } from '../services/apiService';
import { Modal, Box, TextField, Button, Typography, IconButton, Select, MenuItem, FormControl, InputLabel, Alert } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PrintReceiptModal from './PrintReceiptModal';

const AddSale = ({ open, onClose, onAdd }) => {
    const [sale, setSale] = useState({
        furnitureId: '',
        customerName: '',
        quantity: '',
        description: '',
        date: '',
    });
    const [furnitureList, setFurnitureList] = useState([]);
    const [selectedFurniture, setSelectedFurniture] = useState(null);
    const [error, setError] = useState('');
    const [showReceipt, setShowReceipt] = useState(false);
    const [newSaleData, setNewSaleData] = useState(null);

    useEffect(() => {
        if (open) {
            setSale({
                furnitureId: '',
                customerName: '',
                quantity: '',
                description: '',
                date: '',
            });
            setSelectedFurniture(null);
            setError('');
            fetchFurnitureList();
        }
    }, [open]);

    const fetchFurnitureList = async () => {
        try {
            const furnitureData = await getNonPaginatedFurnitures();
            setFurnitureList(furnitureData);
        } catch (error) {
            console.error("Failed to fetch furniture list:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSale((prev) => ({ ...prev, [name]: value }));
    };

    const handleFurnitureChange = (e) => {
        const selectedId = e.target.value;
        const furniture = furnitureList.find((item) => item.furnitureId === selectedId);
        setSale((prev) => ({ ...prev, furnitureId: selectedId }));
        setSelectedFurniture(furniture);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (selectedFurniture && parseInt(sale.quantity) > selectedFurniture.quantity) {
            setError('Insufficient quantity available');
            return;
        } else {
            setError('');
        }

        try {
            const newSale = await postSale(sale);
            onAdd(newSale);
            setNewSaleData(newSale);
            setShowReceipt(true);
            onClose();
        } catch (error) {
            console.error("Error posting sale:", error);
            setError('Failed to add sale. Please try again.');
        }
    };

    const totalPrice = selectedFurniture ? selectedFurniture.price * parseInt(sale.quantity || 0) : 0;

    return (
        <>
            <Modal open={open} onClose={onClose}>
                <Box sx={modalStyle}>
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        sx={{ position: 'absolute', right: 8, top: 8, color: '#6a1b9a' }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h4" align="center" sx={modalTitleStyle}>
                        Add Sale
                    </Typography>
                    {error && <Alert severity="error">{error}</Alert>}
                    <form onSubmit={handleSubmit}>
                        <FormControl fullWidth margin="normal" required>
                            <InputLabel>Furniture</InputLabel>
                            <Select
                                name="furnitureId"
                                value={sale.furnitureId || ''}
                                onChange={handleFurnitureChange}
                                label="Furniture"
                            >
                                {furnitureList.map((furniture) => (
                                    <MenuItem key={furniture.furnitureId} value={furniture.furnitureId}>
                                        {furniture.furnitureName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <TextField
                            name="customerName"
                            label="Customer Name"
                            value={sale.customerName}
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
                            value={sale.quantity}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            required
                            sx={inputStyle}
                        />

                        <TextField
                            label="Price"
                            value={selectedFurniture ? selectedFurniture.price : ''}
                            fullWidth
                            margin="normal"
                            InputProps={{ readOnly: true }}
                            sx={inputStyle}
                        />

                        <TextField
                            label="Total Price"
                            value={totalPrice}
                            fullWidth
                            margin="normal"
                            InputProps={{ readOnly: true }}
                            sx={inputStyle}
                        />

                        <TextField
                            name="description"
                            label="Description"
                            value={sale.description}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            sx={inputStyle}
                        />

                        <TextField
                            name="date"
                            label="Date"
                            type="date"
                            value={sale.date}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            required
                            InputLabelProps={{ shrink: true }}
                            sx={inputStyle}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            
                            sx={submitButtonStyle}
                        >
                            Add Sale
                        </Button>
                    </form>
                </Box>
            </Modal>
            {showReceipt && <PrintReceiptModal open={showReceipt} onClose={() => setShowReceipt(false)} sale={newSaleData} selectedFurniture={selectedFurniture} totalPrice={totalPrice} />}
        </>
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

export default AddSale;
