import * as React from "react";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

// import { AuthProvider } from "../hooks/deprectated/useAuthBasicContext";

import Header from "./Header";

const queryClient = new QueryClient();

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <title>Headless WP App</title>
      <Header />
      <main>{children}</main>

      {/* auth provider requires QueryClient for requests */}
      {/* <AuthProvider> */}
      {/* </AuthProvider> */}

      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
