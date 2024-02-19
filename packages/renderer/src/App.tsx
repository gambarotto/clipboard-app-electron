
import CssBaseline from '@mui/material/CssBaseline';
import Home from './pages/Home';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';
import { ToolBar } from './components/ToolBar';
import { AppContextProvider } from './context/app-context';
import { SnackbarProvider } from './context/snackbar-provider';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppContextProvider>
        <SnackbarProvider>
          <CssBaseline />
          <ToolBar />
          <Home />
        </SnackbarProvider>
      </AppContextProvider>
    </ThemeProvider>
  );
};
export default App;
