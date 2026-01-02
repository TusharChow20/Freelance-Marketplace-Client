import { createBrowserRouter } from "react-router";
import MainLayout from "./Layout/MainLayout";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Authentication/Login";
import Register from "./Pages/Authentication/Register";
import AllJobs from "./Pages/AllJobs/AllJobs";
import axios from "axios";
import JobDetails from "./Pages/AllJobs/JobDetails";
import AddJobs from "./Pages/AllJobs/AddJobs";
import AcceptedJob from "./Pages/AccpetedJob/AcceptedJob";
import UpdateJob from "./Pages/AllJobs/UpdateJob";
import PrivateRoute from "./Provider/PrivateRoute";
import Error404 from "./Pages/Error/Error404";
import MyAddedJobs from "./Pages/AllJobs/MyAddedJobs";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Terms from "./Pages/Terms";
import Privacy from "./Pages/Privacy";
import DashboardLayout from "./Layout/DashboardLayout";
import DashboardHome from "./Pages/Dashboard/DashboardHome";
import Profile from "./Pages/Dashboard/Profile";
import LoadingFallback from "./Loading/Loading";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    HydrateFallback: LoadingFallback,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/Register",
        Component: Register,
      },
      {
        path: "/allJobs",
        Component: AllJobs,
      },
      {
        path: "/allJobs/:id",
        loader: ({ params }) =>
          axios(
            `https://freelance-marketplace-server-azure.vercel.app/jobs/${params.id}`
          ),
        element: (
          <PrivateRoute>
            <JobDetails></JobDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/add-job",
        element: (
          <PrivateRoute>
            <AddJobs></AddJobs>
          </PrivateRoute>
        ),
      },
      // Dashboard routes (user-only)
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        ),
        children: [
          {
            index: true,
            Component: DashboardHome,
          },
          {
            path: "my-jobs",
            Component: MyAddedJobs,
          },
          {
            path: "accepted",
            Component: AcceptedJob,
          },
          {
            path: "profile",
            Component: Profile,
          },
        ],
      },
      // legacy direct routes (still supported for now)
      {
        path: "/myAddedJobs",

        element: (
          <PrivateRoute>
            <MyAddedJobs></MyAddedJobs>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-accepted-tasks",
        element: (
          <PrivateRoute>
            <AcceptedJob></AcceptedJob>
          </PrivateRoute>
        ),
      },
      {
        path: "/update-job/:id",
        Component: UpdateJob,
      },
      {
        path: "/about",
        Component: About,
      },
      {
        path: "/contact",
        Component: Contact,
      },
      {
        path: "/terms",
        Component: Terms,
      },
      {
        path: "/privacy",
        Component: Privacy,
      },
    ],
  },
  {
    path: "/*",
    Component: Error404,
  },
]);
export default router;
