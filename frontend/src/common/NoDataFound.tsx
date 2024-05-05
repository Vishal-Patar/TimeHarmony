import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const NoDataFound = () => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                textAlign: 'center',
                padding: 4,
            }}
        >
            <SearchOutlined sx={{ fontSize: '80px', color: 'grey' }} />
            <Typography variant="h6" color="textSecondary" mt={2}>
                No data found
            </Typography>
            <Button variant="contained" color='secondary' onClick={() => navigate(-1)} sx={{ marginTop: 2 }}>
                Go Back
            </Button>

        </Box>
    );
};

export default NoDataFound;