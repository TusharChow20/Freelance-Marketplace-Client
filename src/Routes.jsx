import { createBrowserRouter } from "react-router";
import MainLayout from "./Layout/MainLayout";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Authentication/Login";
import Register from "./Pages/Authentication/Register";

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
      },
    ],
  },
]);
export default router;
