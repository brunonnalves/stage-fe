// types
import { StateCreator } from 'zustand';
import { MenuProps } from '../../types/menu';

// initial state
const initialState: MenuProps = {
  selectedItem: ['dashboard'],
  drawerOpen: false,
};

// ==============================|| SLICE - MENU ||============================== //

export interface MenuSlice {
  menu: MenuProps;
  setActiveItem: (activeItem: MenuProps['selectedItem']) => void;
  openDrawer: (open: boolean) => void;
}

const menu: StateCreator<MenuSlice, [], [], MenuSlice> = (set) => ({
  menu: initialState,
  setActiveItem: (activeItem: MenuProps['selectedItem']) =>
    set((state) => ({
      menu: { ...state.menu, selectedItem: activeItem, drawerOpen: true },
    })),

  openDrawer: (open: boolean) =>
    set((state) => ({
      menu: { ...state.menu, drawerOpen: open },
    })),
});

export default menu;
