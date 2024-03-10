// material-ui
import { AlertColor, SnackbarOrigin } from '@mui/material';

// ==============================|| SNACKBAR TYPES  ||============================== //

export interface SnackbarProps {
  open: boolean;
  message: string;
  anchorOrigin: SnackbarOrigin;
  severity: AlertColor;
  transition: string;
  close: boolean;
  actionButton: boolean;
  actionButtonText: string;
  actionFunction: () => void;
}
