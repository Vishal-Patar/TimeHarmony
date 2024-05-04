import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Button from "./Button";

interface ConfirmationModalProps {
  onConfirm: () => void;
  open: boolean;
  handleClose: () => void;
  loading?: boolean;
  id?: string;
}

const ConfirmationModal = ({
  onConfirm,
  open,
  handleClose,
  loading,
  id
}: ConfirmationModalProps) => {
  return (
    <Dialog open={open} onClose={handleClose} id={id}>
      <DialogTitle>Confirm</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you? This action cannot be
          undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          color="error"
          variant="contained"
          loading={loading}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;
