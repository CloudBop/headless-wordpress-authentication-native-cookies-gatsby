import * as React from "react";
import { useEffect, ReactNode } from "react";
import { navigate } from "gatsby";

import useAuth from "../hooks/useAuth";
import { useUser } from "../hooks/useUser";

export default function UnAuthContent({ children }: { children: ReactNode }) {
  const { user } = useUser();

  // Navigate authenticated users to Members page.
  useEffect(() => {
    if (user?.viewer?.databaseId) {
      navigate("/members");
    }
  }, [user?.viewer?.databaseId]);

  if (!user?.viewer) {
    return <>{children}</>;
  }

  return <p>Loading...</p>;
}
