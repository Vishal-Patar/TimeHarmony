// LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, CssBaseline, Typography } from '@mui/material';
import { FullHeightContainer } from '../style';

const Landing = () => {
  return (
    <FullHeightContainer>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div>
          <Typography variant="h4" align="center" gutterBottom>
            TimeHarmony
          </Typography>
          <Typography variant="h5" align="center" paragraph>
            Welcome to TimeHarmony, your attendance and leave management solution.
          </Typography>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
            <Button component={Link} to="/login" variant="contained" color="primary" style={{ marginRight: '8px' }}>
              Login
            </Button>
            <Button component={Link} to="/register" variant="outlined" color="primary">
              Register
            </Button>
          </div>
        </div>
      </Container>
    </FullHeightContainer>
  );
};

export default Landing;
