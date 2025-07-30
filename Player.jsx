import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography, CircularProgress } from '@mui/material';

function Player({ song }) {
  const [videoId, setVideoId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!song) return;
    setLoading(true);
    // Construir el query para YouTube
    const query = `${song.name || song.title} ${song.artists?.[0]?.name || ''}`;
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(query)}&key=AIzaSyBo74CyiR2JauKLEVOzZJ0xawAH73ogsiY&maxResults=1`)
      .then(res => res.json())
      .then(data => {
        const id = data.items?.[0]?.id?.videoId;
        setVideoId(id);
        setLoading(false);
      });
  }, [song]);

  if (!song) return null;

  return (
    <Box sx={{ my: 4 }}>
      <Paper elevation={3} sx={{ p: 2, bgcolor: 'background.paper', textAlign: 'center' }}>
        <Typography variant="h6" sx={{ mb: 1 }}>{song.name || song.title}</Typography>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>{song.artists?.[0]?.name || song.user?.username}</Typography>
        <img src={song.images?.[0]?.url || song.artwork_url || song.user?.avatar_url} alt={song.name || song.title} style={{ width: 120, borderRadius: 12, marginBottom: 16 }} />
        <div style={{ marginTop: 16 }}>
          {loading && <CircularProgress color="primary" />}
          {!loading && videoId && (
            <iframe
              width="100%"
              height="315"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title="YouTube player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
          {!loading && !videoId && (
            <Typography color="error">No se encontró el video en YouTube</Typography>
          )}
        </div>
      </Paper>
    </Box>
  );
}

export default Player;
