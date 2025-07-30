import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, AppBar, Toolbar, Grid, Paper, Avatar, Button } from '@mui/material';
import SearchBar from './SearchBar';
import Player from './Player';
import Lyrics from './Lyrics';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import SplashScreen from './SplashScreen';
import SpotifyAuth from './SpotifyAuth';



function MusicApp() {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [selectedSong, setSelectedSong] = useState(null);
  const [lyrics, setLyrics] = useState('');
  const [recommendSongs, setRecommendSongs] = useState([]);
  const [recommendPlaylists, setRecommendPlaylists] = useState([]);

  useEffect(() => {
    if (!loading && token) {
      // Recomendaciones de canciones populares de Spotify
      fetch('https://api.spotify.com/v1/browse/new-releases?limit=8', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => setRecommendSongs(data.albums?.items || []));
      // Recomendaciones de playlists populares de Spotify
      fetch('https://api.spotify.com/v1/browse/featured-playlists?limit=6', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => setRecommendPlaylists(data.playlists?.items || []));
    }
  }, [loading, token]);

  if (loading) {
    return <SplashScreen onFinish={() => setLoading(false)} />;
  }
  if (!token) {
    return <SpotifyAuth onAuth={setToken} />;
  }

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <QueueMusicIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            GLSound - Online Player
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <SearchBar setSelectedSong={setSelectedSong} token={token} />
        <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>Recomendaciones populares</Typography>
        <Grid container spacing={2}>
          {recommendSongs.map(song => (
            <Grid item xs={12} sm={6} md={3} key={song.id}>
              <Paper elevation={2} sx={{ p: 2, textAlign: 'center', cursor: 'pointer' }} onClick={() => setSelectedSong(song)}>
                <Avatar src={song.images?.[0]?.url} sx={{ width: 64, height: 64, mx: 'auto', mb: 1 }} />
                <Typography variant="subtitle1" noWrap>{song.name}</Typography>
                <Typography variant="body2" color="text.secondary" noWrap>{song.artists?.[0]?.name}</Typography>
                <Button variant="text" color="primary" sx={{ mt: 1 }}>Escuchar</Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
        <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>Playlists populares</Typography>
        <Grid container spacing={2}>
          {recommendPlaylists.map(playlist => (
            <Grid item xs={12} sm={6} md={4} key={playlist.id}>
              <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
                <Avatar src={playlist.images?.[0]?.url} sx={{ width: 64, height: 64, mx: 'auto', mb: 1 }} />
                <Typography variant="subtitle1" noWrap>{playlist.name}</Typography>
                <Typography variant="body2" color="text.secondary" noWrap>{playlist.owner?.display_name}</Typography>
                <Button variant="text" color="primary" href={playlist.external_urls?.spotify} target="_blank" sx={{ mt: 1 }}>Ver Playlist</Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
        {selectedSong && <Player song={selectedSong} />}
        {/* Aquí irá la integración con YouTube para reproducir la canción seleccionada */}
        {/* {selectedSong && <Lyrics title={selectedSong.name} artist={selectedSong.artists?.[0]?.name} lyrics={lyrics} setLyrics={setLyrics} />} */}
      </Container>
    </Box>
  );
}

export default MusicApp;
