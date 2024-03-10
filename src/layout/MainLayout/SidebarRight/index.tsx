import React, { memo, useMemo } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Drawer, Stack, useMediaQuery } from '@mui/material';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import LogoSection from '../LogoSection';
import { drawerWidthRight } from '../../../config/constant';
import ViewPatient from '../../../views/PatientView/PatientView';
import { useStore } from '../../../store';

// ==============================|| SIDEBAR RIGHT DRAWER ||============================== //

interface SidebarProps {
  window?: Window;
}

const SidebarRight = ({ window }: SidebarProps) => {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));

  const { drawerRightOpen, selectedItemDrawerRight } = useStore((state) => state.drawerRight);
  const openDrawer = useStore((state) => state.openDrawer);

  let renderComp: React.ReactNode;

  switch (selectedItemDrawerRight) {
    case 'viewPatient':
      renderComp = <ViewPatient />;
      break;

    default:
      renderComp = <></>;
  }

  const logo = useMemo(
    () => (
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <Box sx={{ display: 'flex', p: 2, mx: 'auto' }}>
          <LogoSection />
        </Box>
      </Box>
    ),
    []
  );

  const drawer = useMemo(
    () => (
      <PerfectScrollbar
        component="div"
        style={{
          height: !matchUpMd ? 'calc(100vh - 56px)' : 'calc(100vh - 88px)',
          paddingLeft: '16px',
          paddingRight: '16px',
        }}
      >
        {renderComp}
      </PerfectScrollbar>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [matchUpMd, selectedItemDrawerRight]
  );

  const container = window !== undefined ? () => window.document.body : undefined;

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { md: 0 },
        width: matchUpMd ? drawerWidthRight : 'auto',
        zIndex: drawerRightOpen ? theme.zIndex.speedDial : 0,
      }}
      aria-label="mailbox folders"
    >
      <Drawer
        container={container}
        variant={matchUpMd ? 'persistent' : 'temporary'}
        anchor="right"
        open={drawerRightOpen}
        onClose={() => openDrawer(!drawerRightOpen)}
        sx={{
          '& .MuiDrawer-paper': {
            width: matchUpMd ? drawerWidthRight : 'auto',
            background: theme.palette.background.default,
            color: theme.palette.text.primary,
            borderRight: 'none',
            [theme.breakpoints.up('md')]: {
              top: '88px',
            },
          },
        }}
        ModalProps={{ keepMounted: true }}
        color="inherit"
      >
        {drawerRightOpen && logo}
        {drawerRightOpen && drawer}
      </Drawer>
    </Box>
  );
};

export default memo(SidebarRight);
