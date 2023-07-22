import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './normalize.css'
import { Chat } from '@/routes/Chat'
import { ThemeProvider } from '@lobehub/ui';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Chat />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider themeMode={'dark'}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);


