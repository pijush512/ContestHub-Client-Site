import { createBrowserRouter } from "react-router";
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
import PaymentSuccess from "../pages/Dashboard/Payment/PaymentSuccess";
import PaymentCanceled from "../pages/Dashboard/Payment/PaymentCanceled";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import ExtraSection from "../pages/ExtraSection";
import SubmissionDetails from "../pages/Dashboard/CreatorDashboard/SubmissionDetails";
import MyParticipate from "../pages/Dashboard/UserDashboard/MyParticipate";
import MyWinning from "../pages/Dashboard/UserDashboard/MyWinning";
import ManageUsers from "../pages/Dashboard/AdminDashboard/ManageUsers";
import ManageContests from "../pages/Dashboard/AdminDashboard/ManageContests";
import SubmittedTasks from "../pages/Dashboard/CreatorDashboard/SubmittedTasks";
import Leaderboard from "../pages/Leaderboard";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import TermsOfService from "../pages/TermsOfService";
import DashboardHome from "../pages/Dashboard/DashboardHome";


// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <HomeLayout></HomeLayout>,
//     errorElement: <NotFound></NotFound>,
//     children: [
//       {
//         index: true,
//         path: '/',
//         Component: Home,
//       },
//       {
//         path: 'allContests',
//         Component: AllContests
//       },
//       {
//         path: '/login',
//         Component: Login,
//       },
//       {
//         path: '/register',
//         Component: Register,
//       },
//       {
//         path: 'extra-section',
//         Component: ExtraSection
//       },
//       {
//         path: 'leaderboard',
//         Component: Leaderboard
//       },
//       {
//         path: 'about',
//         Component: AboutUs
//       },
//       {
//         path: 'contact',
//         Component: ContactUs
//       },
//       {
//         path: 'privacy',
//         Component: PrivacyPolicy
//       },
//       {
//         path: 'terms',
//         Component: TermsOfService
//       },
//       {
//         path: 'contest/:id',
//         element: <PrivateRoute>
//           <ContestDetails></ContestDetails>
//         </PrivateRoute>
//       },
//     ]
//   },
//   {
//     path: "/dashboard",
//     element: <PrivateRoute>
//       <DashboardLayout></DashboardLayout>
//     </PrivateRoute>,
//     children: [
//       {
//         index: true,
//         element: <DashboardHome />,
//       },
//       {
//         path: "admin",
//         element: <AdminDashboard />,
//       },
//       {
//         path: "manage-users",
//         element: <ManageUsers />,
//       },
//       {
//         path: "manage-contests",
//         element: <ManageContests />,
//       },
//     ],
//   },
//   {
//     path: "creator",
//     children: [
//       {
//         path: "my-contests",
//         element: <MyContests></MyContests>
//       },
//       {
//         path: "add-contest",
//         element: <AddContest />,
//       },
//       {
//         path: "submitted-tasks",
//         element: <SubmittedTasks></SubmittedTasks>
//       },
//       {
//         path: "edit-contest/:id",
//         element: <EditContest />,
//         loader: ({ params }) =>
//           fetch(`${import.meta.env.VITE_API_URL}/contest/${params.id}`),
//       },
//       {
//         path: "submissions/:id",
//         element: <SubmissionDetails />,
//       },
//     ],
//   },
//   {
//     path: "payment/:contestId",
//     element: <Payment></Payment>
//   },
//   {
//     path: "payment-success",
//     Component: PaymentSuccess,
//   },
//   {
//     path: "payment-cancelled",
//     Component: PaymentCanceled,
//   },
//   {
//     path: "my-participated",
//     element: <MyParticipate />
//   },
//   {
//     path: "my-winning",
//     element: <MyWinning />
//   },
//   {
//     path: "my-profile",
//     element: <Profile />,
//   },
//   {
//     path: "payment-history",
//     Component: PaymentHistory
//   }
// ]

// );



export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: 'allContests', element: <AllContests /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'contest/:id', element: <PrivateRoute><ContestDetails /></PrivateRoute> },
      // বাকি হোম পেজের রাউটগুলো এখানে...
    ]
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
      // ১. ড্যাশবোর্ড হোম (এটি /dashboard পাথে দেখাবে)
      {
        index: true,
        element: <DashboardHome />,
      },
      // ২. প্রোফাইল ও ইউজার রাউটস (এগুলো /dashboard/my-profile পাথে দেখাবে)
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
      // ৩. অ্যাডমিন রাউটস
      {
        path: "admin/manage-users",
        element: <ManageUsers />,
      },
      {
        path: "admin/manage-contests",
        element: <ManageContests />,
      },
      // ৪. ক্রিয়েটর রাউটস
      {
        path: "creator/my-contests",
        element: <MyContests />
      },
      {
        path: "creator/add-contest",
        element: <AddContest />,
      },
      {
        path: "creator/submitted-tasks",
        element: <SubmittedTasks />,
      },
      // ৫. পেমেন্ট রাউটস
      {
        path: "payment/:contestId",
        element: <Payment />
      },
      {
        path: "payment-history",
        element: <PaymentHistory />
      }
    ]
  }
]);