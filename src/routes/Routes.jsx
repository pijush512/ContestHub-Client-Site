import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../Layout/HomeLayout/HomeLayout";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import AllContests from "../pages/AllContests";
import PrivateRoute from "../routes/PrivateRoute"
import DashboardLayout from "../pages/Dashboard/DashboardLayout/DashboardLayout";
import AdminDashboard from "../pages/Dashboard/AdminDashboard/AdminDashboard";
import AddContest from "../pages/Dashboard/CreatorDashboard/AddContest";
import MyContests from "../pages/Dashboard/CreatorDashboard/MyContests";
import EditContest from "../pages/Dashboard/CreatorDashboard/EditContest";
import Profile from "../pages/Dashboard/UserDashboard/Profile";
import ContestDetails from "../pages/ContestDetails";
import Login from "../pages/Login"
import Register from "../pages/Register"
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import ExtraSection from "../pages/ExtraSection";
import MyParticipate from "../pages/Dashboard/UserDashboard/MyParticipate";
import MyWinning from "../pages/Dashboard/UserDashboard/MyWinning";
import ManageUsers from "../pages/Dashboard/AdminDashboard/ManageUsers";
import ManageContests from "../pages/Dashboard/AdminDashboard/ManageContests";
import Leaderboard from "../pages/Leaderboard";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import TermsOfService from "../pages/TermsOfService";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import PaymentSuccess from "../pages/Dashboard/Payment/PaymentSuccess";
import PaymentCanceled from "../pages/Dashboard/Payment/PaymentCanceled";
import SubmittedTasks from "../pages/Dashboard/CreatorDashboard/SubmittedTasks";
import SubmissionDetails from "../pages/Dashboard/CreatorDashboard/SubmissionDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'allContests',
        element: <AllContests />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      },
      {
        path: 'contest/:id',
        element: <PrivateRoute>
          <ContestDetails />
        </PrivateRoute>
      },
      {
        path: 'extra-section',
        Component: ExtraSection
      },
      {
        path: 'leaderboard',
        Component: Leaderboard,
      },
      {
        path: 'about',
        Component: AboutUs,
      },
      {
        path: 'contact',
        Component: ContactUs,
      },
      {
        path: 'contact',
        Component: ContactUs,
      },
      {
        path: 'contact',
        Component: ContactUs,
      },
      {
        path: 'privacy',
        Component: PrivacyPolicy,
      },
      {
        path: 'terms',
        Component: TermsOfService,
      },
    ]
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "my-profile",
        element: <Profile />,
      },
      {
        path: "my-participated",
        element: <MyParticipate />
      },
      {
        path: "my-winning",
        element: <MyWinning />
      },
      {
        path: "admin/manage-users",
        element: <ManageUsers />,
      },
      {
        path: "admin/manage-contests",
        element: <ManageContests />,
      },
      {
        path: "creator/my-contests",
        element: <MyContests />
      },
      {
        path: "creator/add-contest",
        element: <AddContest />,
      },
      {
        path: "creator/edit-contest/:id", 
        element: <EditContest />
      },
      {
        path: "creator/submitted-tasks",
        element: <SubmittedTasks />
      },
      {
        path: "creator/submissions/:id",
        element: <SubmissionDetails></SubmissionDetails>
      },
      {
        path: "payment/:contestId",
        element: <Payment />
      },
      {
        path: "payment-success",
        element: <PaymentSuccess></PaymentSuccess>
      },
      {
        path: "payment-canceled",
        element: <PaymentCanceled></PaymentCanceled>
      },
      {
        path: "payment-history",
        element: <PaymentHistory />
      }
    ]
  }
]);