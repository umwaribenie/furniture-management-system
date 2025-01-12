import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import UserList from './UserList';
import AddUser from './AddUser';

const UserPage = () => {
    const [isAddUserOpen, setIsAddUserOpen] = useState(false);

    const handleCloseAddUser = () => setIsAddUserOpen(false);

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
                                                    marginBottom: '10px',
                                                    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
                                                }}
                                            >
                                Manage Users
                            </Typography>

            <AddUser open={isAddUserOpen} onClose={handleCloseAddUser} />
            <UserList />
        </Container>
    );
};

export default UserPage;
