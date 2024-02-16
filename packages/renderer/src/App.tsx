
import CssBaseline from '@mui/material/CssBaseline';
import Home from './pages/Home';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';
import { ToolBar } from './components/ToolBar';
import { UserProvider } from './context/user-context';
import { SnackbarProvider } from './context/snackbar-provider';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <SnackbarProvider>
          <CssBaseline />
          <ToolBar />
          <Home />
        </SnackbarProvider>
      </UserProvider>
    </ThemeProvider>
  );
};
export default App;
