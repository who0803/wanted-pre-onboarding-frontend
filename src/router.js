import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { Signin, Signup } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "signup",
        element: <Signup />
      },
      {
        path: "/signin",
        element: <Signin />
      },
    ]
  }
]);

export default router;
