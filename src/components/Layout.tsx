import * as React from "react";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { AuthProvider } from "../hooks/useAuth";

import Header from "./Header";

const queryClient = new QueryClient();

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {/* auth provider requires QueryClient for requests */}
      <AuthProvider>
        <title>Headless WP App</title>
        <Header />
        <main>{children}</main>
      </AuthProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
