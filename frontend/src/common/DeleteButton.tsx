import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

interface DeleteButtonProps {
  onDelete: () => void;
  disabled?: boolean;
  loading?: boolean;
}

const DeleteButton = ({ onDelete, disabled, loading }: DeleteButtonProps) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    onDelete();
    setOpen(false);
  };

  return (
    <>
      <IconButton
        aria-label="delete"
        disabled={disabled}
        onClick={() => setOpen(true)}
      >
        <DeleteIcon color="error" />
      </IconButton>
      <DeleteConfirmationModal
        onDelete={handleDelete}
        open={open}
        handleClose={handleClose}
        loading={loading}
      />
    </>
  );
};

export default DeleteButton;
