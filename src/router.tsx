import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from './pages/HomePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    children: [
      {
        path: '/album/:albumId',
        element: <HomePage />,
        children: [
          {
            path: '/album/:albumId/photo/:photoId',
            element: <HomePage />,
          },
        ],
      },
    ],
  },
]);
