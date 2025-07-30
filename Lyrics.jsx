import React, { useEffect } from 'react';
import { Box, Typography, Paper } from '@mui/material';

const LYRICS_API = 'https://api.lyrics.ovh/v1';

function Lyrics({ title, artist, lyrics, setLyrics }) {
  useEffect(() => {
    if (!title || !artist) return;
    const fetchLyrics = async () => {
      try {
        const res = await fetch(`${LYRICS_API}/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`);
        const data = await res.json();
        setLyrics(data.lyrics || 'Letra no encontrada.');
      } catch {
        setLyrics('Letra no encontrada.');
      }
    };
    fetchLyrics();
  }, [title, artist, setLyrics]);

  return (
    <Box sx={{ my: 4 }}>
      <Paper elevation={2} sx={{ p: 2, bgcolor: 'background.paper' }}>
        <Typography variant="h6">Letra de la canción</Typography>
        <Typography variant="subtitle1">{title} - {artist}</Typography>
        <Typography variant="body1" sx={{ whiteSpace: 'pre-line', mt: 2 }}>
          {lyrics}
        </Typography>
      </Paper>
    </Box>
  );
}

export default Lyrics;
