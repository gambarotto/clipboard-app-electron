
import CssBaseline from '@mui/material/CssBaseline';
import Home from './pages/Home';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';
import { ToolBar } from './components/ToolBar';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToolBar />

      <Home />
    </ThemeProvider>
  );
};
export default App;
