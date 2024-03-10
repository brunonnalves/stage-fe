// project imports
import { useStore } from '../../store';
import { snackbarInitialState } from '../../config/constant';

// types
import { SnackbarProps } from '../../types/snackbar';

export function successSnackbarTrigger(
  openSnackbar: (snackbarProps: SnackbarProps) => void,
  message: string
) {
  openSnackbar({
    ...snackbarInitialState,
    severity: 'success',
    message,
  });
}

export function errorSnackbarTrigger(
  openSnackbar: (snackbarProps: SnackbarProps) => void,
  error: any
) {
  openSnackbar({
    ...snackbarInitialState,
    severity: 'error',
    message: error,
  });
}
