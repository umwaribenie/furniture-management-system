import React from 'react';
import { Modal, Box, Typography, Button, IconButton } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import CloseIcon from '@mui/icons-material/Close';

const PrintReceiptModal = ({ open, onClose, sale, selectedFurniture, totalPrice }) => {
    const handlePrint = () => {
        window.print();
    };

    return (
        <>
            <style>
                {`
                    @media print {
                        .no-print {
                            display: none;
                        }
                    }
                `}
            </style>
            <Modal open={open} onClose={onClose}>
                <Box sx={receiptModalStyle}>
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: '#6a1b9a',  // Close icon color matching the theme
                        }}
                        className="no-print"
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography
                        variant="h4"
                        align="center"
                        style={{
                            fontFamily: 'Verdana, sans-serif',
                            fontSize: '2rem',
                            fontWeight: 'bold',
                            color: '#6a1b9a',
                            textAlign: 'center',
                            marginBottom: '20px',
                            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
                        }}
                    >
                        Receipt
                    </Typography>
                    <Typography variant="body1">Customer Name: {sale.customerName}</Typography>
                    <Typography variant="body1">Furniture: {selectedFurniture?.furnitureName}</Typography>
                    <Typography variant="body1">Quantity: {sale.quantity}</Typography>
                    <Typography variant="body1">Price: {selectedFurniture?.price}</Typography>
                    <Typography variant="body1">Total Price: {totalPrice}</Typography>
                    <Typography variant="body1">Date: {sale.date}</Typography>
                    <Typography variant="body1">Description: {sale.description}</Typography>
                    
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<PrintIcon />}
                        onClick={handlePrint}
                        className="no-print"
                        sx={{
                            backgroundColor: '#6a1b9a',  // Matching color to the theme
                            color: 'white',
                            fontSize: '0.9rem',
                            padding: '8px 12px',
                            borderRadius: '8px',
                            margin: '10px auto',
                            display: 'block',
                            transition: 'background-color 0.3s ease',
                            cursor: 'pointer',
                            '&:hover': {
                                backgroundColor: '#9c4dcc',  // Hover effect color
                            },
                        }}
                    >
                        Print Receipt
                    </Button>
                </Box>
            </Modal>
        </>
    );
};

const receiptModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'white',
    border: '2px solid #6a1b9a', // Matching the border color to the theme
    borderRadius: '8px', // Rounded corners
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};

export default PrintReceiptModal;
