import * as React from "react";
import { useEffect, ReactNode } from "react";
import { navigate } from "gatsby";

import useAuth from "../hooks/useAuth";

export default function AuthContent({ children }: { children: ReactNode }) {
  const { loggedIn, isLoading } = useAuth();
  // console.log(`loggedIn`, loggedIn);
  // console.log(`isLoading`, isLoading);
  // Navigate unauthenticated users to Log In page.
  useEffect(() => {
    if (!isLoading && !loggedIn) {
      navigate("/log-in");
    }
  }, [loggedIn, isLoading, navigate]);

  if (loggedIn) {
    return <>{children}</>;
  }

  return <p>Loading...</p>;
}
