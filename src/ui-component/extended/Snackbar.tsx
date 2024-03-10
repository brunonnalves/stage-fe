import { SyntheticEvent } from 'react';

// material-ui
import { Alert, Button, Fade, Grow, IconButton, Slide, SlideProps } from '@mui/material';
import MuiSnackbar from '@mui/material/Snackbar';

// project imports

// assets
import CloseIcon from '@mui/icons-material/Close';

// types
import { KeyedObject } from '../../types';
import { useStore } from '../../store';

// animation function
function TransitionSlideLeft(props: SlideProps) {
  return <Slide {...props} direction="left" />;
}

function TransitionSlideUp(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}

function TransitionSlideRight(props: SlideProps) {
  return <Slide {...props} direction="right" />;
}

function TransitionSlideDown(props: SlideProps) {
  return <Slide {...props} direction="down" />;
}

function GrowTransition(props: SlideProps) {
  return <Grow {...props} />;
}

// animation options
const animation: KeyedObject = {
  SlideLeft: TransitionSlideLeft,
  SlideUp: TransitionSlideUp,
  SlideRight: TransitionSlideRight,
  SlideDown: TransitionSlideDown,
  Grow: GrowTransition,
  Fade,
};

// ==============================|| SNACKBAR ||============================== //

const Snackbar = () => {
  const snackbar = useStore((state) => state.snackbar);
  const closeSnackbar = useStore((state) => state.closeSnackbar);
  const {
    open,
    message,
    anchorOrigin,
    severity,
    transition,
    close,
    actionButton,
    actionButtonText,
    actionFunction,
  } = snackbar;

  const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    closeSnackbar();
  };

  return (
    <>
      <MuiSnackbar
        TransitionComponent={animation[transition]}
        anchorOrigin={anchorOrigin}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          severity={severity}
          variant="filled"
          action={
            <>
              {actionButton !== false && (
                <Button color="inherit" size="small" onClick={actionFunction}>
                  {actionButtonText}
                </Button>
              )}
              {close !== false && (
                <IconButton color="inherit" size="small" aria-label="close" onClick={handleClose}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              )}
            </>
          }
        >
          {message}
        </Alert>
      </MuiSnackbar>
    </>
  );
};

export default Snackbar;
