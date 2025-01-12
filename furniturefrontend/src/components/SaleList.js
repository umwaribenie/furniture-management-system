import React, { useEffect, useState } from 'react';
import { getSales, deleteSale } from '../services/apiService';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    TextField,
    Pagination,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import AddSale from './AddSale';
import EditSale from './EditSale';
import * as XLSX from 'xlsx'; // For exporting data to Excel

const SaleList = () => {
    const [sales, setSales] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingSaleId, setEditingSaleId] = useState(null);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [filters, setFilters] = useState({
        saleId: '',
        customerName: '',
        furnitureName: '',
        quantity: '',
        totalPrice: '',
        date: '',
        description: ''
    });

    useEffect(() => {
        fetchData(page, rowsPerPage);
    }, [page, rowsPerPage]);

    const fetchData = async (page, rowsPerPage) => {
        try {
            const result = await getSales(page - 1, rowsPerPage);
            setSales(result.content || []);
            setTotalPages(result.totalPages);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteSale(id);
            fetchData(page, rowsPerPage);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    // Filtering function to include all the criteria dynamically
    const filteredSales = sales.filter((sale) =>
        (filters.saleId ? sale.saleId.toString().toLowerCase().includes(filters.saleId.toLowerCase()) : true) &&
        (filters.customerName ? sale.customerName.toLowerCase().includes(filters.customerName.toLowerCase()) : true) &&
        (filters.furnitureName ? sale.furniture.furnitureName.toLowerCase().includes(filters.furnitureName.toLowerCase()) : true) &&
        (filters.quantity ? sale.quantity.toString().toLowerCase().includes(filters.quantity.toLowerCase()) : true) &&
        (filters.totalPrice ? sale.totalPrice.toString().toLowerCase().includes(filters.totalPrice.toLowerCase()) : true) &&
        (filters.date ? sale.date.toLowerCase().includes(filters.date.toLowerCase()) : true) &&
        (filters.description ? sale.description.toLowerCase().includes(filters.description.toLowerCase()) : true)
    );

    const handlePageChange = (event, value) => setPage(value);
    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(event.target.value);
        setPage(1);
    };

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(
            filteredSales.map((sale) => ({
                'Sale ID': sale.saleId,
                'Customer Name': sale.customerName,
                'Furniture': sale.furniture.furnitureName,
                'Quantity': sale.quantity,
                'Total Price': sale.totalPrice,
                'Date': sale.date,
                'Description': sale.description
            }))
        );
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sales');
        XLSX.writeFile(workbook, 'SalesData.xlsx');
    };

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setIsAddModalOpen(true)}
                    sx={{ mb: 3, borderRadius: '8px', padding: '10px 20px', backgroundColor: '#5e35b1', '&:hover': { backgroundColor: '#512da8' }}}
                >
                    Add Sale
                </Button>

                <Button
                    variant="contained"
                    color="success"
                    onClick={exportToExcel}
                    sx={{ mb: 3, ml: 2, borderRadius: '8px', padding: '10px 20px', backgroundColor: '#2e7d32', '&:hover': { backgroundColor: '#1b5e20' }}}
                >
                    Export to Excel
                </Button>
            </Box>

            <AddSale
                open={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onAdd={(newSale) => setSales([...sales, newSale])}
            />
            <EditSale
                open={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                saleId={editingSaleId}
                onUpdate={(updatedSale) =>
                    setSales(sales.map((sale) =>
                        sale.saleId === updatedSale.saleId ? updatedSale : sale
                    ))
                }
            />

            <TableContainer component={Paper} sx={{ mb: 4, boxShadow: 3, borderRadius: '12px', width: '130%', overflow: 'hidden' }}>
                <Table sx={{ backgroundColor: 'rgba(230, 239, 240, 0.67)' }}>
                    <TableHead sx={{ backgroundColor: 'rgba(230, 239, 240, 0.67)' }}>
                         <TableRow  >
                                                    <TableCell sx={{ fontWeight: 'bold', backgroundColor: 'rgba(230, 239, 240, 0.67)' }}>
                                                        <TextField
                                                            label="Search ID"
                                                            name="saleId"
                                                            variant="outlined"
                                                            value={filters.saleId}
                                                            onChange={handleFilterChange}
                                                            fullWidth
                                                            margin="dense"
                                                            sx={{ borderRadius: '8px' }}
                                                        />
                                                    </TableCell>
                                                    <TableCell sx={{ fontWeight: 'bold', color: '#424242' }}>
                                                        <TextField
                                                            label="Search Name"
                                                            name="customerName"
                                                            variant="outlined"
                                                            value={filters.customerName}
                                                            onChange={handleFilterChange}
                                                            fullWidth
                                                            margin="dense"
                                                            sx={{ borderRadius: '8px' }}
                                                        />
                                                    </TableCell>
                                                    <TableCell sx={{ fontWeight: 'bold', color: '#424242' }}>
                                                        <TextField
                                                            label="Search furnitureName"
                                                            name="furnitureName"
                                                            variant="outlined"
                                                            value={filters.furnitureName}
                                                            onChange={handleFilterChange}
                                                            fullWidth
                                                            margin="dense"
                                                            sx={{ borderRadius: '8px' }}
                                                        />
                                                    </TableCell>
                                                    <TableCell sx={{ fontWeight: 'bold', color: '#424242' }}>
                                                        <TextField
                                                            label="Search Quantity"
                                                            name="quantity"
                                                            variant="outlined"
                                                            value={filters.quantity}
                                                            onChange={handleFilterChange}
                                                            fullWidth
                                                            margin="dense"
                                                            sx={{ borderRadius: '8px' }}
                                                        />
                                                    </TableCell>
                                                    <TableCell sx={{ fontWeight: 'bold', color: '#424242' }}>
                                                        <TextField
                                                            label="Search totalPrice"
                                                            name="totalPrice"
                                                            variant="outlined"
                                                            value={filters.totalPrice}
                                                            onChange={handleFilterChange}
                                                            fullWidth
                                                            margin="dense"
                                                            sx={{ borderRadius: '8px' }}
                                                        />
                                                    </TableCell>
                                                    <TableCell sx={{ fontWeight: 'bold', color: '#424242' }}>
                                                        <TextField
                                                            label="Search date"
                                                            name="date"
                                                            variant="outlined"
                                                            value={filters.date}
                                                            onChange={handleFilterChange}
                                                            fullWidth
                                                            margin="dense"
                                                            sx={{ borderRadius: '8px' }}
                                                        />
                                                    </TableCell>
                                                    <TableCell sx={{ fontWeight: 'bold', color: '#424242' }}>
                                                        <TextField
                                                            label="Search Description"
                                                            name="description"
                                                            variant="outlined"
                                                            value={filters.description}
                                                            onChange={handleFilterChange}
                                                            fullWidth
                                                            margin="dense"
                                                            sx={{ borderRadius: '8px' }}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                       
                        <TableRow sx={{ backgroundColor: '#9c27b0' }}>
                            {['Sale ID', 'Customer Name', 'Furniture', 'Quantity', 'Total Price', 'Date', 'Description'].map((header) => (
                                <TableCell key={header} sx={{ color: '#fff' }}>{header}</TableCell>
                            ))}
                            <TableCell align="center" sx={{ color: '#fff' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredSales.map((sale) => (
                            <TableRow key={sale.saleId} sx={{ backgroundColor: 'rgba(230, 239, 240, 0.67)' }}>
                                <TableCell>{sale.saleId}</TableCell>
                                <TableCell>{sale.customerName}</TableCell>
                                <TableCell>{sale.furniture.furnitureName}</TableCell>
                                <TableCell>{sale.quantity}</TableCell>
                                <TableCell>{sale.totalPrice}</TableCell>
                                <TableCell>{sale.date}</TableCell>
                                <TableCell>{sale.description}</TableCell>
                                <TableCell align="right">
                                    <Box display="inline-flex" justifyContent="flex-start" alignItems="center">
                                        <Button
                                            color="primary"
                                            size="small"
                                            startIcon={<EditIcon />}
                                            onClick={() => {
                                                setEditingSaleId(sale.saleId);
                                                setIsEditModalOpen(true);
                                            }}
                                            sx={{ mr: 1 }}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            color="secondary"
                                            size="small"
                                            startIcon={<DeleteIcon />}
                                            onClick={() => handleDelete(sale.saleId)}
                                        >
                                            Delete
                                        </Button>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                    <InputLabel>Rows per page</InputLabel>
                    <Select
                        value={rowsPerPage}
                        onChange={handleRowsPerPageChange}
                        label="Rows per page"
                    >
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                    </Select>
                </FormControl>
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Box>
        </Box>
    );
};

export default SaleList;
