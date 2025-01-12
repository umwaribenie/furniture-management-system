import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import SaleList from './SaleList';
import AddSale from './AddSale';

const SalePage = () => {
    const [isAddSaleOpen, setIsAddSaleOpen] = useState(false);

    const handleCloseAddSale = () => setIsAddSaleOpen(false);

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
                            <Typography
                                                variant="h4"
                                                align="center"
                                                style={{
                                                    fontFamily: 'Verdana, sans-serif',
                                                    fontSize: '2.5rem',
                                                    fontWeight: 'bold',
                                                    color: '#6a1b9a',
                                                    textAlign: 'center',
                                                    marginBottom: '-10px',
                                                    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
                                                }}
                                            >
                                Manage Sales
                            </Typography>

            <AddSale open={isAddSaleOpen} onClose={handleCloseAddSale} />
            <SaleList />
        </Container>
    );
};

export default SalePage;
