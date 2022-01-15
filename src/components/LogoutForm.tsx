import * as React from "react";
import { useAuthService } from "../hooks/useAuthService";
import { useUser } from "../hooks/useUser";
// import { useEffect } from "react";
// import { useMutation, gql } from "@apollo/client";
// import { GET_USER } from "../hooks/useAuth";

// const LOG_OUT = gql`
//   mutation logOut {
//     logout(input: {}) {
//       status
//     }
//   }
// `;

export default function LogOut() {
  const { signout } = useAuthService();
  // const [logOut, { called, loading, error, data }] = useMutation(LOG_OUT, {
  //   refetchQueries: [{ query: GET_USER }],
  // });
  // const loggedOut = Boolean(data?.logout?.status);
  // useEffect(() => {
  //   logOut();
  // }, [logOut]);
  const { user } = useUser();

  if (user?.viewer) {
    // console.log(`object`);
    signout();
  }

  return (
    <div>
      <h1>Log Out</h1>
      {/* {!called || loading ? (
        <p>Logging out...</p>
      ) : error ? (
        <p>{error.message}</p>
      ) : !loggedOut ? (
        <p>Unable to log out. Please reload the page and try again.</p>
      ) : (
        <p>You have been logged out.</p>
      )} */}
    </div>
  );
}
