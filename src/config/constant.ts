// types
import { SnackbarProps } from '../types/snackbar';

// theme constant
export const gridSpacing = 2;
export const drawerWidthLeft = 260;
export const appDrawerWidth = 320;
export const drawerWidthRight = `calc(50% - ${drawerWidthLeft}px)`;

// project constant
export const BASE_URL = import.meta.env.VITE_BE_BASE_URL || 'http://localhost:3333';
export const statusOptions = ['IN_PROGRESS', 'FINISHED'];

// snackbar initial state
export const snackbarInitialState: SnackbarProps = {
  open: false,
  message: '',
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'right',
  },
  severity: 'success',
  transition: 'Fade',
  close: true,
  actionButton: true,
  actionButtonText: '',
  actionFunction: () => {},
};
