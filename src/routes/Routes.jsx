import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layout/HomeLayout/HomeLayout";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import AllContests from "../pages/AllContests";
import PrivateRoute from "../routes/PrivateRoute"
import DashboardLayout from "../pages/Dashboard/DashboardLayout/DashboardLayout";
import AdminDashboard from "../pages/Dashboard/AdminDashboard/AdminDashboard";
import CreatorDashboard from "../pages/Dashboard/CreatorDashboard/CreatorDashboard";
import UserDashboard from "../pages/Dashboard/UserDashboard/UserDashboard";
import AddContest from "../pages/Dashboard/CreatorDashboard/AddContest";
import MyContests from "../pages/Dashboard/CreatorDashboard/MyContests";
import EditContest from "../pages/Dashboard/CreatorDashboard/EditContest";
import ContestSubmissions from "../pages/Dashboard/CreatorDashboard/ContestSubmissions";
import Profile from "../pages/Dashboard/UserDashboard/Profile";
import ContestDetails from "../pages/ContestDetails";
import Login from "../pages/Login"
import Register from "../pages/Register"
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentSuccess from "../pages/Dashboard/Payment/PaymentSuccess";
import PaymentCanceled from "../pages/Dashboard/Payment/PaymentCanceled";


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
      },
      {
        path: 'contest/:id',
        element: <PrivateRoute>
          <ContestDetails></ContestDetails>
        </PrivateRoute>
      },
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
        Component: CreatorDashboard,
        children: [
          {
            path: "add-contest",
            element: <AddContest />,
          },
          {
            path: "my-contests",
            element: <MyContests />,
          },
          {
            path: "edit-contest/:id",
            element: <EditContest />,
            loader: ({ params }) =>
              fetch(`${import.meta.env.VITE_API_URL}/contest/${params.id}`),
          },
          {
            path: "submissions/:id",
            element: <ContestSubmissions />,
          },
        ],
      },
      {
        path: "payment/:contestId",
        element: <Payment></Payment>
      },
      {
        path: "payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "payment-cancelled",
        Component: PaymentCanceled,
      },
      {
        path: "user",
        Component: UserDashboard
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ]
  }
]);