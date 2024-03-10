import { StateCreator } from 'zustand';

// project import
import { snackbarInitialState } from '../../config/constant';

// types
import { SnackbarProps } from '../../types/snackbar';

const initialState = snackbarInitialState;

// ==============================|| SLICE - SNACKBAR ||============================== //
export interface SnackbarSlice {
  snackbar: SnackbarProps;
  openSnackbar: (snackbarProps: SnackbarProps) => void;
  closeSnackbar: () => void;
}

const snackbar: StateCreator<SnackbarSlice, [], [], SnackbarSlice> = (set) => ({
  snackbar: initialState,
  openSnackbar: (snackbarProps: SnackbarProps) =>
    set(() => ({
      snackbar: { ...snackbarProps, open: true },
    })),

  closeSnackbar: () =>
    set((state) => ({
      snackbar: { ...state.snackbar, open: false },
    })),
});

export default snackbar;
