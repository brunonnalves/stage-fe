import React, { useMemo } from 'react';
import { Outlet } from 'react-router-dom';

// material-ui
import { styled, useTheme, Theme } from '@mui/material/styles';
import { AppBar, Box, Container, CssBaseline, Toolbar, useMediaQuery } from '@mui/material';

// project imports
import Breadcrumbs from '../../ui-component/extended/Breadcrumbs';
import Header from './Header';
import Sidebar from './Sidebar';
import SidebarRight from './SidebarRight';
import navigation from '../../menu-items';
import useConfig from '../../hooks/useConfig';
import { drawerWidthLeft, drawerWidthRight } from '../../config/constant';

// assets
import { IconChevronRight } from '@tabler/icons-react';
import { useStore } from '../../store';

interface MainStyleProps {
  theme: Theme;
  open: boolean;
  openright: boolean;
}

// styles
const Main = styled('main', {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'openright',
})(({ theme, open, openright }: MainStyleProps) => ({
  ...theme.typography.mainContent,
  ...(!open &&
    !openright && {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.shorter,
      }),
      [theme.breakpoints.up('md')]: {
        marginLeft: -(drawerWidthLeft - 20),
        marginRight: `calc(20px - ${drawerWidthRight})`,
        width: `calc(100% - ${drawerWidthLeft}px)`,
      },
      [theme.breakpoints.down('md')]: {
        marginLeft: '20px',
        marginRight: '20px',
        width: `calc(100% - ${drawerWidthLeft}px)`,
        padding: '16px',
      },
      [theme.breakpoints.down('sm')]: {
        marginLeft: '10px',
        marginRight: '10px',
        width: `calc(100% - ${drawerWidthLeft}px)`,
        padding: '16px',
      },
    }),
  ...(open &&
    openright && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.shorter,
      }),
      marginLeft: 0,
      marginRight: 0,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      width: `calc(100% - ${drawerWidthLeft}px)`,
      [theme.breakpoints.down('md')]: {
        marginLeft: '20px',
        marginRight: '20px',
      },
      [theme.breakpoints.down('sm')]: {
        marginLeft: '10px',
        marginRight: '10px',
      },
    }),
  ...(!open &&
    openright && {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.shorter,
      }),
      [theme.breakpoints.up('md')]: {
        marginLeft: -(drawerWidthLeft - 20),
        marginRight: 0,
        width: `calc(100% - ${drawerWidthLeft}px)`,
      },
      [theme.breakpoints.down('md')]: {
        marginLeft: '20px',
        marginRight: '20px',
        width: `calc(100% - ${drawerWidthLeft}px)`,
        padding: '16px',
      },
      [theme.breakpoints.down('sm')]: {
        marginLeft: '10px',
        marginRight: '10px',
        width: `calc(100% - ${drawerWidthLeft}px)`,
        padding: '16px',
      },
    }),
  ...(open &&
    !openright && {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.shorter,
      }),
      [theme.breakpoints.up('md')]: {
        marginLeft: 0,
        marginRight: `calc(20px - ${drawerWidthRight})`,
        width: `calc(100% - ${drawerWidthLeft}px)`,
      },
      [theme.breakpoints.down('md')]: {
        marginLeft: '20px',
        marginRight: '20px',
        width: `calc(100% - ${drawerWidthLeft}px)`,
        padding: '16px',
      },
      [theme.breakpoints.down('sm')]: {
        marginLeft: '10px',
        marginRight: '10px',
        width: `calc(100% - ${drawerWidthLeft}px)`,
        padding: '16px',
      },
    }),
}));

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('lg'));
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));

  const { drawerOpen } = useStore((state) => state.menu);
  const openDrawer = useStore((state) => state.openDrawer);
  const { drawerRightOpen } = useStore((state) => state.drawerRight);
  const { container } = useConfig();

  React.useEffect(() => {
    openDrawer(!matchDownMd);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchDownMd]);

  const header = useMemo(
    () => (
      <Toolbar>
        <Header />
      </Toolbar>
    ),
    []
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* header */}
      <AppBar
        enableColorOnDark
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          bgcolor: theme.palette.background.default,
          transition: drawerOpen ? theme.transitions.create('width') : 'none',
          zIndex: theme.zIndex.speedDial + 1,
        }}
      >
        {header}
      </AppBar>

      {/* drawer left */}
      <Sidebar />

      {/* main content */}
      <Main
        theme={theme}
        open={drawerOpen}
        openright={drawerRightOpen}
        sx={{ zIndex: matchUpMd ? 999 : null }}
      >
        {/* breadcrumb */}
        {container && (
          <Container maxWidth="lg">
            <Breadcrumbs
              separator={IconChevronRight}
              navigation={navigation}
              icon
              title
              rightAlign
            />
            <Outlet />
          </Container>
        )}
        {!container && (
          <>
            <Breadcrumbs
              separator={IconChevronRight}
              navigation={navigation}
              icon
              title
              rightAlign
            />
            <Outlet />
          </>
        )}
      </Main>

      {/* drawer right */}
      <SidebarRight />
    </Box>
  );
};

export default MainLayout;
