import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import LoginScreen from '../screen/loginScreen.jsx';
import ProfileScreen from '../screen/ProfileScreen.jsx';
import SignupScreen from '../screen/registerScreen.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <LoginScreen />,
  },
  {
    path:'/register',
    element: <SignupScreen />,
  },
  {
    path: "*",
    element: <div>404 Not Found</div>,
  },
  {
    path: "/profile",
    element: <ProfileScreen />,
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
