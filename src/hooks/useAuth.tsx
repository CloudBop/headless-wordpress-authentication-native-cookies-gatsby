// import { useQuery, gql, ApolloError } from "@apollo/client";

import React, { createContext, useContext, ReactNode } from "react";
import { useQuery } from "react-query";
import gql from "graphql-tag";
import { GraphQLClient } from "graphql-request";
// static public data
const headers: RequestInit = {
  headers: {
    // authorization: `Bearer token goes here ${token && token || 'demotoken'}`
  },
  credentials: "include",
  mode: "cors",
};
const endpoint = `${process.env.GATSBY_WORDPRESS_API_URL}`;
const graphQLClient = new GraphQLClient(endpoint, headers);
//
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

export const GET_USER_CREDENTIAL = gql`
  query getUser {
    viewer {
      id
      databaseId
      firstName
      lastName
      email
      capabilities
    }
  }
`;

export const fetchUserCredential = async () => {
  // get the user data, user will have to be authenticated
  return await graphQLClient.request(GET_USER_CREDENTIAL);
};

export function AuthProvider({ children }: { children: ReactNode }) {
  //
  const { data, isLoading, error } = useQuery(
    "user-login-creds",
    fetchUserCredential,
    { staleTime: 1000 * 60 * 3 }
    // { staleTime: 1000 * 60 * 60 }
  );
  const user = data?.viewer || null;
  const loggedIn = Boolean(user);
  const value = {
    loggedIn,
    user,
    isLoading,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

const useAuth = () => useContext(AuthContext);

export default useAuth;
