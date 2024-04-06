import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, TextField, Typography, CssBaseline } from '@mui/material';
import { FullHeightContainer } from '../style';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login data:', formData);
    // You can add your login logic and API calls here

    // after successful login
    navigate('/dashboard')
  };

  return (
    <FullHeightContainer maxWidth="xs">
      <CssBaseline />
      <div>
        <Typography variant="h5" align="center">
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            fullWidth
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Button type="submit" fullWidth variant="contained" color="primary">
            Login
          </Button>
        </form>
        <Typography variant="body2" align="center" style={{ marginTop: '16px' }}>
          <Link to="/password-reset">Forgot password?</Link>
        </Typography>
        <Typography variant="body2" align="center" style={{ marginTop: '16px' }}>
          Don't have an account? <Link to="/register">Register here</Link>
        </Typography>
      </div>
    </FullHeightContainer>
  );
};

export default Login;
