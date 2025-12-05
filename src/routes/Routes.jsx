import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layout/HomeLayout/HomeLayout";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import AllContests from "../pages/AllContests";
import Login from "../pages/Login";
import Register from "../pages/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    errorElement: <NotFound></NotFound>,
    children: [
      {
        index: true,
        path: '/',
        Component: Home,
      },
      {
        path: 'allContests',
        Component: AllContests
      },
      {
        path: '/login',
        Component:Login,
      },
      {
        path: '/register',
        Component: Register,
      }
    ]
  },
]);