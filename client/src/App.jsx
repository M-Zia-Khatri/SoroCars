import { RouterProvider } from "react-router-dom";
import { AppRouter, AuthRouter } from "./routes/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useAuth from "./stores/AuthStore";

export default function App() {
  const queryClient = new QueryClient();

  const { isLoggedIn } = useAuth();

  const router = isLoggedIn ? AppRouter : AuthRouter;
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}
