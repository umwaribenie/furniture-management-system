import axios from 'axios';
const API_BASE_URL = 'http://localhost:8080/api';

// Global Search API 
export const globalSearch = async (query) => { 
    try { const response = await axios.get(`${API_BASE_URL}/global-search`, 
        { params: { query } }); return response.data; } catch (error) { 
            console.error("Error  search:", error); throw error; } };

// Furniture APIs
export const getAllFurnitures = async (page, size) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/furniture`, {
            params: { page, size }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const getNonPaginatedFurnitures = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/furniture/all`);
        return response.data;
    } catch (error) {
        console.error("Error :", error);
        throw error;
    }
};
export const postFurniture = async (furnitureDto) => {
    const response = await axios.post(`${API_BASE_URL}/furniture`, furnitureDto);
    return response.data;
};

export const getFurnitureById = async (id) => {
    const response = await axios.get(`${API_BASE_URL}/furniture/${id}`);
    return response.data;
};

export const updateFurniture = async (id, furnitureDto) => {
    const response = await axios.put(`${API_BASE_URL}/furniture/${id}`, furnitureDto);
    return response.data;
};

export const deleteFurniture = async (id) => {
    await axios.delete(`${API_BASE_URL}/furniture/${id}`);
};


// Sale APIs
export const postSale = async (saleDto) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/sale`, saleDto);
        return response.data;
    } catch (error) {
        console.error("Error creating sale:", error);
        throw error;
    }
};

export const updateSale = async (id, saleDto) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/sale/${id}`, saleDto);
        return response.data;
    } catch (error) {
        console.error("Error updating sale:", error);
        throw error;
    }
};

export const getAllSales = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/sale/all`);
        return response.data;
    } catch (error) {
        console.error("Error fetching all sales:", error);
        throw error;
    }
};

export const getSaleById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/sale/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching sale by ID:", error);
        throw error;
    }
};

export const getSales = async (page, size) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/sale`, {
            params: { page, size }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching paginated sales:", error);
        throw error;
    }
};

export const deleteSale = async (id) => {
    try {
        await axios.delete(`${API_BASE_URL}/sale/${id}`);
    } catch (error) {
        console.error("Error deleting sale:", error);
        throw error;
    }
};

// Data APIs
export const getStats = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/stats`);
        return response.data;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};

export const getDiagram = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/graph`);
        return response.data;
    } catch (error) {
        console.error("Error :", error);
        throw error;
    }
};
// User APIs
export const getAllUsers = async (page, size) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/user`, {
            params: { page, size }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

export const postUser = async (userDto) => {
    const response = await axios.post(`${API_BASE_URL}/user`, userDto);
    return response.data;
};

export const signupUser = async (userDto) => {
    const response = await axios.post(`${API_BASE_URL}/user/signup`, userDto);
    return response.data;
};

export const sendOtpForPasswordReset = async (otpEmail) => {
    const response = await axios.post(`${API_BASE_URL}/user/send-otp`, null, {
        params: { otpEmail }
    });
    return response.data;
};

export const resetPassword = async (email, otpEmail, otp, newPassword) => {
    const response = await axios.put(`${API_BASE_URL}/user/reset-password`, null, {
        params: { email, otpEmail, otp, newPassword }
    });
    return response.data;
};

export const getUserById = async (id) => {
    const response = await axios.get(`${API_BASE_URL}/user/${id}`);
    return response.data;
};

export const updateUser = async (id, userDto) => {
    const response = await axios.put(`${API_BASE_URL}/user/${id}`, userDto);
    return response.data;
};

export const deleteUser = async (id) => {
    await axios.delete(`${API_BASE_URL}/user/${id}`);
};

