function SearchBar({ setSelectedSong, token }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [type, setType] = useState('track');

  const handleSearch = async () => {
    if (!query || !token) return;
    const res = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=${type}&limit=10`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    let items = [];
    if (type === 'track') items = data.tracks?.items || [];
    if (type === 'artist') items = data.artists?.items || [];
    if (type === 'playlist') items = data.playlists?.items || [];
    setResults(items);
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Buscar en Spotify</Typography>
      <TextField
        label="Buscar"
        variant="outlined"
        fullWidth
        value={query}
        onChange={e => setQuery(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Box sx={{ mb: 2 }}>
        <Button variant={type === 'track' ? 'contained' : 'outlined'} color="primary" onClick={() => setType('track')} sx={{ mr: 1 }}>Canciones</Button>
        <Button variant={type === 'artist' ? 'contained' : 'outlined'} color="primary" onClick={() => setType('artist')} sx={{ mr: 1 }}>Artistas</Button>
        <Button variant={type === 'playlist' ? 'contained' : 'outlined'} color="primary" onClick={() => setType('playlist')}>Playlists</Button>
      </Box>
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Buscar
      </Button>
      <List>
        {results.map(item => (
          <ListItem button key={item.id} onClick={() => setSelectedSong(item)}>
            <Avatar src={item.images?.[0]?.url || item.icons?.[0]?.url} sx={{ mr: 2 }} />
            <ListItemText
              primary={item.name}
              secondary={type === 'track' ? item.artists?.[0]?.name : type === 'playlist' ? item.owner?.display_name : ''}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default SearchBar;
