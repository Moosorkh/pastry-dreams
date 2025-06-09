
import { Box, Fab, useScrollTrigger, Zoom } from '@mui/material';
import { KeyboardDoubleArrowUp as KeyboardDoubleArrowUpIcon } from '@mui/icons-material';

export default function ScrollToTop() {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={scrollToTop}
        role="presentation"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 1000,
        }}
      >
        <Fab
          color="primary"
          size="small"
          aria-label="scroll back to top"
          sx={{
            transition: 'transform 0.2s ease',
            '&:hover': {
              transform: 'translateY(-4px)'
            }
          }}
        >
          <KeyboardDoubleArrowUpIcon />
        </Fab>
      </Box>
    </Zoom>
  );
}