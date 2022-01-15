import * as React from "react";
import { useEffect, ReactNode } from "react";
import { navigate } from "gatsby";

import useAuth from "../hooks/useAuth";
import { useUser } from "../hooks/useUser";

export default function AuthContent({ children }: { children: ReactNode }) {
  const { user } = useUser();
  // console.log(`loggedIn`, loggedIn);
  // console.log(`isLoading`, isLoading);
  // Navigate unauthenticated users to Log In page.
  useEffect(() => {
    if (!user?.viewer?.databaseId) {
      navigate("/log-in");
    }
  }, [user?.viewer?.databaseId]);

  if (user?.viewer) {
    return <>{children}</>;
  }

  return <p>Loading...</p>;
}
