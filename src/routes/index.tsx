import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/Home";
// import Signin from "../pages/signin"
// import Signup from "../pages/signup"
// import Logout from "../pages/logout";
// import NotFound from "../pages/Notfound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
//   {
//     path: "/signin",
//     element: <Signin />
//   },
//   {
//     path: "/signup",
//     element: <Signup />
//   },
//   {
//     path: "/logout",
//     element: <Logout />
//   },
//   {
//     path: "*",
//     element: <NotFound />
//   },
  
]);
export default router;