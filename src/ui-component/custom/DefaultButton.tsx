import { Button, ButtonProps } from '@mui/material';
import React from 'react';

export interface DefaultButtonProps {
  title: String;
  startIcon?: ButtonProps['startIcon'];
  endIcon?: ButtonProps['endIcon'];
  onClick?: ButtonProps['onClick'];
  type?: ButtonProps['type'];
  sx?: ButtonProps['sx'];
}

const DefaultButton = ({ title, startIcon, endIcon, onClick, type, sx }: DefaultButtonProps) => {
  return (
    <Button
      startIcon={startIcon}
      endIcon={endIcon}
      sx={{
        textTransform: 'none',
        minWidth: '80px',
        minHeight: '40px',
        fontSize: '14px',
        fontWeight: '400',
        lineHeight: '1.1',
        color: '#fff',
        padding: '0 16px',
        border: '1px solid #5533FF',
        borderRadius: '12px',
        background:
          'linear-gradient(90deg, rgba(10, 3, 41, 0.2) 0%, rgba(255, 255, 255, 0.116) 51.56%, rgba(10, 3, 41, 0.2) 100%), #5533FF',

        '&:hover': {
          background:
            'linear-gradient(90deg, rgba(10, 3, 41, 0.2) 0%, rgba(255, 255, 255, 0.116) 51.56%, rgba(10, 3, 41, 0.2) 100%), #5533FF',
        },
        ...sx,
      }}
      onClick={onClick}
      type={type}
    >
      {title}
    </Button>
  );
};

export default DefaultButton;
