import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme/materialYouTheme';
import MusicApp from './components/MusicApp';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MusicApp />
    </ThemeProvider>
  );
}

export default App;
