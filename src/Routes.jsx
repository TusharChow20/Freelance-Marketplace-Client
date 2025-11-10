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

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
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
          axios(`http://localhost:3000/jobs/${params.id}`),
        Component: JobDetails,
      },
      {
        path: "/add-job",
        Component: AddJobs,
      },
      {
        path: "/my-accepted-tasks",
        Component: AcceptedJob,
      },
    ],
  },
]);
export default router;
