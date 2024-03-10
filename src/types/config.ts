import { PaletteMode } from '@mui/material';

export type ConfigProps = {
  fontFamily: string;
  borderRadius: number;
  outlinedFilled: boolean;
  navType: PaletteMode;
  presetColor: string;
  container: boolean;
};

export type CustomizationProps = {
  fontFamily: string;
  borderRadius: number;
  outlinedFilled: boolean;
  navType: PaletteMode;
  presetColor: string;
  container: boolean;
  onChangeMenuType: (navType: PaletteMode) => void;
  onChangePresetColor: (presetColor: string) => void;
  onChangeContainer: () => void;
  onChangeFontFamily: (fontFamily: string) => void;
  onChangeBorderRadius: (event: Event, newValue: number | number[]) => void;
  onChangeOutlinedField: (outlinedFilled: boolean) => void;
};
