import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/Home";
import Signin from "../pages/Signin"
import Signup from "../pages/Signup"
import Logout from "../pages/Logout";
// import NotFound from "../pages/Notfound";

const router = createBrowserRouter([
  {
    path: "/",  
    element: <Home/>
  },
  {
    path: "/signin",
    element: <Signin />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/logout",
    element: <Logout />
  },
//   {
//     path: "*",
//     element: <NotFound />
//   },
  
]);
export default router;