import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layout/HomeLayout/HomeLayout";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import AllContests from "../pages/AllContests";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "../routes/PrivateRoute"
import DashboardLayout from "../pages/Dashboard/DashboardLayout/DashboardLayout";
import AdminDashboard from "../pages/Dashboard/AdminDashboard/AdminDashboard";
import CreatorDashboard from "../pages/Dashboard/CreatorDashboard/CreatorDashboard";
import UserDashboard from "../pages/Dashboard/UserDashboard/UserDashboard";

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
        Component: Login,
      },
      {
        path: '/register',
        Component: Register,
      }
    ]
  },
  {
    path: "/dashboard",
    element: <PrivateRoute>
      <DashboardLayout></DashboardLayout>
    </PrivateRoute>,
    children: [
      {
        path: "admin",
        Component: AdminDashboard
      },
      {
        path: "creator",
        Component: CreatorDashboard
      },
      {
        path: "user",
        Component: UserDashboard
      },
    ]
  }
]);