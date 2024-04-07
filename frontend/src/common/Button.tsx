import { ButtonProps, Button as MuiButton } from '@mui/material'
import React, { ReactNode } from 'react'
import CircularProgress from '@mui/material/CircularProgress';

interface CustomButtonProps extends ButtonProps {
    loading?: boolean;
    loadingIndicator?: ReactNode;
    loadingPosition?: 'start' | 'end' | 'center';
    startIcon?: ReactNode;
    endIcon?: ReactNode;
}

const Button = ({
    children,
    loading,
    loadingPosition,
    loadingIndicator,
    ...props
}: CustomButtonProps) => {
    return (
        <MuiButton
            endIcon={loadingPosition === 'end' && loadingIndicator}
            {...props}
        >
            {loadingPosition === 'start' && loadingIndicator}
            {children}
            {loadingPosition === 'center' && loadingIndicator}
            {loading && <CircularProgress color="inherit" size={16} />}
        </MuiButton>
    )
}

export default Button