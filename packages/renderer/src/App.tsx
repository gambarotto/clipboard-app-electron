
import CssBaseline from '@mui/material/CssBaseline';
import Home from './pages/Home';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';
import { ToolBar } from './components/ToolBar';
import { UserProvider } from './context/user-context';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <CssBaseline />
        <ToolBar />
        <Home />
      </UserProvider>
    </ThemeProvider>
  );
};
export default App;
