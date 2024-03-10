import { StateCreator } from 'zustand';

// initial state
const initialState = {
  selectedItemDrawerRight: '',
  drawerRightOpen: false,
};
// ==============================|| SLICE - DRAWER RIGHT ||============================== //

export interface DrawerRightSlice {
  drawerRight: { selectedItemDrawerRight: string; drawerRightOpen: boolean };
  setSelectedItemDrawerRight: (selectedItemDrawerRight: string) => void;
  openRightDrawer: () => void;
  closeRightDrawer: () => void;
}

const drawerRight: StateCreator<DrawerRightSlice, [], [], DrawerRightSlice> = (set) => ({
  drawerRight: initialState,
  setSelectedItemDrawerRight: (selectedItemDrawerRight: string) =>
    set((state) => ({
      drawerRight: {
        ...state.drawerRight,
        selectedItemDrawerRight: selectedItemDrawerRight,
        drawerRightOpen: true,
      },
    })),
  openRightDrawer: () =>
    set((state) => ({
      drawerRight: { ...state.drawerRight, drawerRightOpen: true },
    })),
  closeRightDrawer: () =>
    set((state) => ({
      drawerRight: { ...state.drawerRight, drawerRightOpen: false },
    })),
});

export default drawerRight;
