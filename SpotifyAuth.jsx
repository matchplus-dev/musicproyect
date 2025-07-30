import React, { useEffect } from 'react';

const CLIENT_ID = '7c548c384bcf432da9c9d20577697f34';
const REDIRECT_URI = 'https://localhost:3000/callback';
const SCOPES = 'user-read-private user-read-email';

function SpotifyAuth({ onAuth }) {
  useEffect(() => {
    const hash = window.location.hash;
    let token = null;
    if (hash) {
      const params = new URLSearchParams(hash.replace('#', '?'));
      token = params.get('access_token');
      if (token) {
        onAuth(token);
        return;
      }
    }
    // Si no hay token, redirige a Spotify Auth
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPES)}`;
    window.location.replace(authUrl);
  }, [onAuth]);

  return null;
}

export default SpotifyAuth;
