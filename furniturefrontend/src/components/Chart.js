import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const Chart = () => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/data/graph');
                setChartData(response.data); // Use response.data instead of the whole response object
            } catch (error) {
                console.error("Error fetching chart data:", error);
            }
        };
        fetchData();
    }, []);

    const processData = () => {
        if (!chartData || !chartData.saleList) return { labels: [], datasets: [] }; // Check if saleList exists

        const currentDate = new Date();
        const twoMonthAgo = new Date();
        twoMonthAgo.setMonth(currentDate.getMonth() - 2);

        const filterData = (dataList) => {
            return dataList.filter(item => {
                const itemDate = new Date(item.date);
                return itemDate >= twoMonthAgo && itemDate <= currentDate;
            });
        };

        const filteredSales = filterData(chartData.saleList);

        // Extract and sort unique dates
        const allDates = Array.from(new Set([...filteredSales].map(item => new Date(item.date).toLocaleDateString())))
            .sort((a, b) => new Date(a) - new Date(b));

        // Map amounts to respective dates
        const mapAmounts = (dataList, allDates) => {
            return allDates.map(date => {
                const item = dataList.find(i => new Date(i.date).toLocaleDateString() === date);
                return item ? item.totalPrice : 0;
            });
        };

        const saleAmounts = mapAmounts(filteredSales, allDates);

        return {
            labels: allDates,
            datasets: [
                {
                    label: 'Sales',
                    data: saleAmounts,
                    borderColor: '#6a1b9a', // Purple color
                    backgroundColor: 'rgba(106, 27, 154, 0.2)', // Light purple background
                    fill: true,
                    tension: 0.4, // Smooth curved line
                    pointBackgroundColor: '#6a1b9a', // Purple points
                    pointRadius: 5, // Larger points for better visibility
                    pointHoverBackgroundColor: '#4a148c', // Darker purple on hover
                    borderWidth: 3, // Thicker line for visibility
                },
            ],
        };
    };

    const chartOptions = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    color: '#6a1b9a', // Purple legend text
                    font: {
                        size: 16,
                    },
                },
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dark background for tooltips
                titleColor: 'white',
                bodyColor: 'white',
                borderColor: 'white',
                borderWidth: 1,
            },
        },
        scales: {
            x: {
                ticks: {
                    color: 'black', // Black x-axis labels
                    font: {
                        size: 14,
                    },
                },
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)', // Light grid lines
                },
            },
            y: {
                ticks: {
                    color: 'black', // Black y-axis labels
                    font: {
                        size: 14,
                    },
                },
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)', // Light grid lines
                },
            },
        },
        hover: {
            mode: 'nearest',
            intersect: false,
        },
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '500px', width: '100%' }}>
            {chartData ? <Line data={processData()} options={chartOptions} /> : <p>Loading chart...</p>}
        </div>
    );
};

export default Chart;
