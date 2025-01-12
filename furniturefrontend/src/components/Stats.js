import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const Stats = () => {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetching data from the backend
                const response = await axios.get('http://localhost:8080/api/data/stats');
                
                // Accessing the 'data' field from the response object
                setStats(response.data);  // The actual data is inside response.data
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };
        fetchData();
    }, []);

    // Function to format numbers with commas
    const formatNumber = (number) => {
        return number.toLocaleString();
    };

    return (
        <div>
            {stats ? (
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card sx={{ bgcolor: '#6a1b9a', color: 'white', boxShadow: 3 }}>
                            <CardContent>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Total Furniture Count</Typography>
                                <Typography variant="body1" sx={{ fontSize: '2rem', fontWeight: 'bold', color: 'black' }}>
                                    {stats.furnitureCount}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card sx={{ bgcolor: '#0288d1', color: 'white', boxShadow: 3 }}>
                            <CardContent>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Total Sale Count</Typography>
                                <Typography variant="body1" sx={{ fontSize: '2rem', fontWeight: 'bold', color: 'black' }}>
                                    {stats.saleCount}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card sx={{ bgcolor: '#388e3c', color: 'white', boxShadow: 3 }}>
                            <CardContent>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Total Furniture Price</Typography>
                                <Typography variant="body1" sx={{ fontSize: '2rem', fontWeight: 'bold', color: 'black' }}>
                                    {formatNumber(stats.furnitureTotalPrice)} RWF
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card sx={{ bgcolor: '#f57c00', color: 'white', boxShadow: 3 }}>
                            <CardContent>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Total Sale Price</Typography>
                                <Typography variant="body1" sx={{ fontSize: '2rem', fontWeight: 'bold', color: 'black' }}>
                                    {formatNumber(stats.saleTotalPrice)} RWF
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            ) : (
                <p>Loading stats...</p>
            )}
        </div>
    );
};

export default Stats;
