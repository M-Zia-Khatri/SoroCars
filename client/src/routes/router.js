import { createBrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import AuthRoutes from "./AuthRoutes";

export const AppRouter = createBrowserRouter(AppRoutes);
export const AuthRouter = createBrowserRouter(AuthRoutes);