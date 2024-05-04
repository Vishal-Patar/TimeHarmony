import { IconButton } from "@mui/material";
import { ReactElement, useState } from "react";
import ConfirmationModal from "./ConfirmationModal";

interface ConfirmationButtonProps {
    onConfirm: () => void;
    disabled?: boolean;
    loading?: boolean;
    children: ReactElement;
    id?: string;
}

const ConfirmationButton = ({ onConfirm, disabled, loading, children, id }: ConfirmationButtonProps) => {
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = () => {
        onConfirm();
        setOpen(false);
    };

    return (
        <>
            <IconButton
                disabled={disabled}
                onClick={() => setOpen(true)}
            >
                {children}
            </IconButton>
            <ConfirmationModal
                id={id}
                onConfirm={handleConfirm}
                open={open}
                handleClose={handleClose}
                loading={loading}
            />
        </>
    );
};

export default ConfirmationButton;
