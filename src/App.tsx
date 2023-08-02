import './App.css';
import { createTheme, ThemeProvider } from '@mui/material';
import { RouterProvider } from 'react-router';
import { router } from './router.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  const theme = createTheme();
  const client = new QueryClient();

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={client}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
