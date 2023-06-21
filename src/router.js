import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { Signin, Signup, Todo } from "./pages";

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
      {
        path: "/todo",
        element: <Todo />
      },
    ]
  }
]);

export default router;
