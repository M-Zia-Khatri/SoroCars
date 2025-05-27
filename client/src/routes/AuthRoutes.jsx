import { AuthNavigation } from "@/constants/navigationConstants";
import Login from "@/pages/AuthPages/Login";
import { Navigate } from "react-router-dom";

const AuthRoutes = [
  {
    path: AuthNavigation.Login,
    element: <Login />,
  },
  {
    path: "*",
    element: <Navigate to={AuthNavigation.Login} />,
  },
];

export default AuthRoutes;
