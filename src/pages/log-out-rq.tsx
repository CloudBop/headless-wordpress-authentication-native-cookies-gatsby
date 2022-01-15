import * as React from "react";
import { useEffect } from "react";
import { useMutation, gql } from "@apollo/client";
import Layout from "../components/Layout";
import { useUser } from "../hooks/useUser";
import LogOutForm from "../components/LogoutForm";

// const responseLogOut ={
//     "status": "SUCCESS",
//     "__typename": "LogoutPayload"
// }

export default function LogOutRQ() {
  return (
    <Layout>
      {/* <h1>Log Out</h1> */}
      <LogOutForm />
      {/* {!called || loading ? (
        <p>Logging out...</p>
      ) : error ? (
        <p>{error.message}</p>
      ) : !loggedOut ? (
        <p>Unable to log out. Please reload the page and try again.</p>
      ) : (
        <p>You have been logged out.</p>
      )} */}
    </Layout>
  );
}
