import React, { useEffect, useState } from 'react';
import { getAllFurnitures, deleteFurniture } from '../services/apiService';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Pagination from '@mui/material/Pagination';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import AddFurniture from './AddFurniture';
import EditFurniture from './EditFurniture';
import * as XLSX from 'xlsx';  // Import the xlsx library

const FurnitureList = () => {
    const [furnitures, setFurnitures] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingFurnitureId, setEditingFurnitureId] = useState(null);
    const [page, setPage] = useState(1); 
    const [totalPages, setTotalPages] = useState(1); 
    const [rowsPerPage, setRowsPerPage] = useState(5); 
    const [filters, setFilters] = useState({
        furnitureId: '',
        furnitureName: '',
        price: '',
        quantity: '',
        description: ''
    });

    useEffect(() => {
        fetchData(page, rowsPerPage);
    }, [page, rowsPerPage]);

    const fetchData = async (page, rowsPerPage) => {
        try {
            const result = await getAllFurnitures(page - 1, rowsPerPage); 
            setFurnitures(result.content || []); 
            setTotalPages(result.totalPages);  
        } catch (error) {
            console.error('Error :', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteFurniture(id);
            fetchData(page, rowsPerPage);  
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleAddFurniture = async (newFurniture) => { 
        const lastPage = totalPages; 
        await fetchData(lastPage, rowsPerPage); 
        setFurnitures((prevFurnitures) => [...prevFurnitures, newFurniture]); 
        setPage(lastPage); 
    };

    const handleUpdateFurniture = (updatedFurniture) => {
        setFurnitures(furnitures.map(furniture => 
            furniture.furnitureId === updatedFurniture.furnitureId ? updatedFurniture : furniture
        ));
        setIsEditModalOpen(false); 
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
    };

    const filteredFurnitures = furnitures.filter(furniture =>
        furniture.furnitureId.toString().toLowerCase().includes(filters.furnitureId.toLowerCase()) &&
        furniture.furnitureName.toLowerCase().includes(filters.furnitureName.toLowerCase()) &&    
        furniture.price.toString().toLowerCase().includes(filters.price.toLowerCase()) &&
        furniture.quantity.toString().toLowerCase().includes(filters.quantity.toLowerCase()) &&
        furniture.description.toLowerCase().includes(filters.description.toLowerCase())
    );

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(event.target.value);
        setPage(1); 
    };

    // Export to Excel
    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(filteredFurnitures);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Furnitures');
        XLSX.writeFile(wb, 'furnitures.xlsx');
    };

    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                
                onClick={() => setIsAddModalOpen(true)}
                sx={{ mb: 3, borderRadius: '8px', padding: '10px 20px', backgroundColor: '#5e35b1', '&:hover': { backgroundColor: '#512da8' }}}
            >
               Add Furniture
            </Button>

            <Button
                variant="contained"
                color="success"
                onClick={exportToExcel}  // Add the export function here
                sx={{ mb: 3, ml: 2, borderRadius: '8px',marginLeft:'500px', padding: '10px 20px', backgroundColor: '#2e7d32', '&:hover': { backgroundColor: '#1b5e20' }}}
            >
                Export to Excel
            </Button>

            <AddFurniture 
                open={isAddModalOpen} 
                onClose={() => setIsAddModalOpen(false)} 
                onAdd={handleAddFurniture} 
            />
            
            <EditFurniture
                open={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                furnitureId={editingFurnitureId}
                onUpdate={handleUpdateFurniture}
            />
            
            <TableContainer component={Paper} sx={{ mb: 4, boxShadow: 3, borderRadius: '12px', width: '110%', overflow: 'hidden' }}>
                <Table sx={{ backgroundColor: 'rgba(230, 239, 240, 0.67)' }}>
                    <TableHead sx={{ backgroundColor: 'rgba(230, 239, 240, 0.67)' }}>
                        <TableRow  >
                            <TableCell sx={{ fontWeight: 'bold', backgroundColor: 'rgba(230, 239, 240, 0.67)' }}>
                                <TextField
                                    label="Search ID"
                                    name="furnitureId"
                                    variant="outlined"
                                    value={filters.furnitureId}
                                    onChange={handleFilterChange}
                                    fullWidth
                                    margin="dense"
                                    sx={{ borderRadius: '8px' }}
                                />
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: '#424242' }}>
                                <TextField
                                    label="Search Name"
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
                                    label="Search Price"
                                    name="price"
                                    variant="outlined"
                                    value={filters.price}
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
                            <TableCell sx={{ color: '#fff' }}>Furniture ID</TableCell>
                            <TableCell sx={{ color: '#fff' }}>Furniture Name</TableCell>
                            <TableCell sx={{ color: '#fff' }}>Price</TableCell>
                            <TableCell sx={{ color: '#fff' }}>Quantity</TableCell>
                            <TableCell sx={{ color: '#fff' }}>Description</TableCell>
                            <TableCell sx={{ color: '#fff', textAlign: 'right' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredFurnitures.map(furniture => (
                            <TableRow key={furniture.furnitureId} sx={{  backgroundColor: 'rgba(230, 239, 240, 0.67)'  }}>
                                <TableCell>{furniture.furnitureId}</TableCell>
                                <TableCell>{furniture.furnitureName}</TableCell>
                                <TableCell>{furniture.price}</TableCell>
                                <TableCell>{furniture.quantity}</TableCell>
                                <TableCell>{furniture.description}</TableCell>
                                <TableCell align="right">
    <Box display="inline-flex" justifyContent="flex-start" alignItems="center">
        <Button
            color="primary"
            startIcon={<EditIcon />}
            onClick={() => {
                setEditingFurnitureId(furniture.furnitureId);
                setIsEditModalOpen(true);
            }}
            sx={{ mr: 1, borderRadius: '8px'}}
        >
            Edit
        </Button>
        <Button
            color="secondary"
            startIcon={<DeleteIcon />}
            onClick={() => handleDelete(furniture.furnitureId)}
            sx={{ borderRadius: '8px'}}
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
            
            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
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
                    sx={{ display: 'flex', alignItems: 'center' }}
                />
            </Box>
        </div>
    );
};

export default FurnitureList;
