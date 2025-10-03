import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import LoginScreen from '../screen/loginScreen.tsx';
import ProfileScreen from '../screen/ProfileScreen.tsx';
import SignupScreen from '../screen/registerScreen.tsx';

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/login", element: <LoginScreen /> },
  { path: "/register", element: <SignupScreen /> },
  { path: "/profile", element: <ProfileScreen /> },
  { path: "*", element: <div><img src='https://static.vecteezy.com/system/resources/thumbnails/008/255/803/small_2x/page-not-found-error-404-system-updates-uploading-computing-operation-installation-programs-system-maintenance-a-hand-drawn-layout-template-of-a-broken-robot-illustration-vector.jpg'/></div> },
]);

const rootElement = document.getElementById('root');

if (!rootElement) throw new Error('Failed to find the root element with ID "root"');

const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
