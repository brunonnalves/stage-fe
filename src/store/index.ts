// third-party
import { create } from 'zustand';

// project imports
import menu, { MenuSlice } from './slices/menu';
import drawerRight, { DrawerRightSlice } from './slices/drawerRight';
import snackbar, { SnackbarSlice } from './slices/snackbar';
import patient, { PatientSlice } from './slices/patient';

// ==============================|| REDUX - MAIN STORE ||============================== //

export const useStore = create<MenuSlice & DrawerRightSlice & SnackbarSlice & PatientSlice>(
  (...a) => ({
    ...menu(...a),
    ...drawerRight(...a),
    ...snackbar(...a),
    ...patient(...a),
  })
);
