import React, { useEffect } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';

function SplashScreen({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2500); // 2.5 segundos
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', bgcolor: 'background.default' }}>
      <img src="/logo.jpg" alt="GLSound Logo" style={{ width: 160, marginBottom: 32 }} />
      <Typography variant="h3" color="primary" fontWeight={700} sx={{ mb: 2 }}>
        GLSound
      </Typography>
      <CircularProgress color="primary" />
    </Box>
  );
}

export default SplashScreen;
