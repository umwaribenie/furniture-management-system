import React, { useState, useEffect } from 'react';
import { Modal, Box, IconButton, Typography, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { useHotkeys } from 'react-hotkeys-hook';
import { useNavigate } from 'react-router-dom';

const GlobalSearchModal = ({ open, onClose, results, setResults }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const inputRef = React.useRef(null);
    const [timer, setTimer] = useState(null);
    const navigate = useNavigate();

    useHotkeys('esc', onClose);

    useEffect(() => {
        if (open) {
            inputRef.current?.focus();
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
            setSearchQuery('');
            setResults({});
        }
    }, [open, setResults]);

    const handleSearchOnChange = async (e) => {
        setSearchQuery(e.target.value);

        if (timer) {
            clearTimeout(timer);
        }

        if (!e.target.value) {
            setResults({});
            return;
        }

        setLoading(true);
        setTimer(
            setTimeout(async () => {
                try {
                    const response = await axios.get('http://localhost:8080/api/global-search', {
                        params: { query: e.target.value },
                    });
                    setResults(response.data);
                    setLoading(false);
                } catch (error) {
                    setLoading(false);
                    console.error('Error fetching search results:', error);
                }
            }, 500)
        );
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const handleResultClick = (entity) => {
        switch (entity.toLowerCase()) {
            case 'sales':
                navigate(`/sales`);
                break;
            case 'furnitures':
                navigate(`/furnitures`);
                break;
            default:
                break;
        }
        onClose(); // Close modal after clicking a result
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="global-search-modal"
            aria-describedby="global-search-description"
        >
  <Box 
    sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        maxHeight: '80vh', 
        bgcolor: 'background.paper',
        border: '2px solid #6a1b9a',
        boxShadow: 24,
        overflowY: 'auto',
        borderRadius: '8px',
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }}
>

                <IconButton 
                    aria-label="close" 
                    onClick={onClose} 
                    sx={{ 
                        position: 'absolute', 
                        right: 8, 
                        top: 8,
                        color: '#6a1b9a', // Close icon color
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <Typography variant="h4" align="center" sx={{ fontFamily: 'Verdana, sans-serif', color: '#6a1b9a', fontWeight: 'bold' }}>
                    Global Search
                </Typography>
                <TextField
                    fullWidth
                    label="Search"
                    value={searchQuery}
                    onChange={handleSearchOnChange}
                    inputRef={inputRef}
                    sx={{
                        marginTop: '20px',
                        '& .MuiInputLabel-root': { color: '#6a1b9a' },
                        '& .MuiInputLabel-root.Mui-focused': { color: '#6a1b9a' },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: '#ccc' },
                            '&:hover fieldset': { borderColor: '#6a1b9a' },
                            '&.Mui-focused fieldset': { borderColor: '#6a1b9a' },
                        },
                    }}
                />
                {loading && <Typography variant="body1" sx={{ marginTop: 2 }}>Loading...</Typography>}
                <Box mt={4} sx={{ width: '100%' }}>
                    {Object.entries(results).map(([key, values], index) => (
                        <div key={index} style={{ marginBottom: '20px' }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#6a1b9a' }}>
                                {capitalizeFirstLetter(key)}
                            </Typography>
                            {values.length === 0 ? (
                                <Typography variant="body1" sx={{ color: '#555' }}>
                                    No  {capitalizeFirstLetter(key)}.
                                </Typography>
                            ) : (
                                <Box component="ul" sx={{ padding: 0, listStyle: 'none' }}>
                                    {values.map((item, idx) => (
                                        <Box 
                                            component="li" 
                                            key={idx}
                                            sx={{
                                                backgroundColor: '#f0f0f0',
                                                borderRadius: '8px',
                                                marginBottom: '8px',
                                                padding: '12px',
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    backgroundColor: '#e0e0e0',
                                                }
                                            }}
                                            onClick={() => handleResultClick(key)}
                                        >
                                            <Typography variant="subtitle1">
                                                {item.furniture ? item.furniture.furnitureName : item.saleId || item.furnitureName || 'No Name '}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: '#555' }}>
                                                {item.description || 'No Description '}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>
                            )}
                        </div>
                    ))}
                </Box>
            </Box>
        </Modal>
    );
};

export default GlobalSearchModal;
