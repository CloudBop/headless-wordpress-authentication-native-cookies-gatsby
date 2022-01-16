// import { useQuery, gql, ApolloError } from "@apollo/client";
import React, { createContext, useContext, ReactNode } from "react";
// import { useQuery } from "react-query";
// import { wpgraphqlUserCredential } from "../wpgraphqlApi/cors";

/**
 * context and useQuery @ top level, Not currently in use, delagated to RQ
 */

export interface User {
  id: string;
  databaseId: number;
  firstName: string;
  lastName: string;
  email: string;
  capabilities: string[];
}

interface AuthData {
  loggedIn: boolean;
  user?: User;
  isLoading: boolean;
  // error?: ApolloError;
}

const DEFAULT_STATE: AuthData = {
  loggedIn: false,
  user: undefined,
  isLoading: false,
  // error: undefined,
};

const AuthContext = createContext(DEFAULT_STATE);

export function AuthProvider({ children }: { children: ReactNode }) {
  //
  // const { data, isLoading, error } = useQuery(
  //   "user-login-creds",
  //   wpgraphqlUserCredential,
  //   // should be length of cookie...
  //   { staleTime: 1000 * 60 * 3 }
  //   // { staleTime: 1000 * 60 * 60 }
  // );
  const user = null; //data?.viewer || null;
  const loggedIn = Boolean(user);
  const value = {
    loggedIn,
    user,
    isLoading: false,
    error: false,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

const useAuth = () => useContext(AuthContext);

export default useAuth;
