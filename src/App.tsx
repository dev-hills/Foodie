import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./AppRoutes";
import { useEffect } from "react";

const App = () => {
  const currentLocation = window.location.pathname;
  const reactQueryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  useEffect(() => {
    if (currentLocation !== "/login") {
      window.location.href = "/login";
    }
  });
  return (
    <div>
      <QueryClientProvider client={reactQueryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </QueryClientProvider>
    </div>
  );
};

export default App;
