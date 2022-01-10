import * as React from "react";
import { Link, navigate } from "gatsby";
import { fetchUserCredential, GET_USER_CREDENTIAL } from "../hooks/useAuth";
import gql from "graphql-tag";
import { GraphQLClient } from "graphql-request";
import { useMutation, useQueryClient } from "react-query";

// Apollo Client Implementation
// import { useMutation, gql } from "@apollo/client";
// const [logIn, { loading, error }] = useMutation(LOG_IN, {
//   refetchQueries: [
//     { query: GET_USER }
//   ],
// });
// const LOG_IN = gql`
//   mutation logIn($login: String!, $password: String!) {
//     loginWithCookies(input: {
//       login: $login
//       password: $password
//     }) {
//       status
//     }
//   }
// `;

// react-query
// prep headers
const headers: RequestInit = {
  headers: {
    // authorization: `Bearer token goes here ${token && token || 'demotoken'}`
  },
  credentials: "include",
  mode: "cors",
};
// static public data
const endpoint = `${process.env.GATSBY_WORDPRESS_API_URL}`;
const graphQLClient = new GraphQLClient(endpoint, headers);
//
const LOG_IN_COOKIE = gql`
  mutation logIn($login: String!, $password: String!) {
    loginWithCookies(input: { login: $login, password: $password }) {
      status
    }
  }
`;
//
const fetchCookieLogin = async (variables) => {
  try {
    // console.log(`variables`, variables);
    const result = await graphQLClient.request(LOG_IN_COOKIE, variables);
    console.log(`result`, result);
    const successResult = JSON.stringify(result, undefined, 2);
    const toJson = JSON.parse(successResult);
    return toJson;
  } catch (error) {
    const errorResult = JSON.stringify(error, undefined, 2);
    const toJson = JSON.parse(errorResult);
    // console.dir(toJson)
    return toJson;
  }
};

export default function LogInForm() {
  const queryClient = useQueryClient();
  const {
    mutate: cookieLogin,
    mutateAsync,
    isLoading: isCookieLoading,
    isSuccess: isCookieSuccess,
    isError: isCookieError,
    isIdle: isCookieIdle,

    error: errorCookie,
    // if success
    data: resultLoginCookie,
  } = useMutation(fetchCookieLogin, {
    onSuccess: async (data, variables, context) => {
      console.log(`data`, data);
      queryClient.fetchQuery("user-login-creds", fetchUserCredential);
      // }
    },
    onSettled: (data, error, variables, context) => {
      // Error or success... doesn't matter!
    },
    // onError: (error, variables, context) => {
    //   // An error happened!
    //   console.log(`rolling back optimistic update with id ${context.id}`);
    // },
  });
  console.log(`isCookieError`, isCookieError);
  console.log(`errorCookie`, errorCookie);
  const errorMessage = errorCookie || "";
  // const isEmailValid =
  //   !errorCookie.includes("empty_email") &&
  //   !errorCookie.includes("empty_username") &&
  //   !errorCookie.includes("invalid_email") &&
  //   !errorCookie.includes("invalid_username");
  // const isPasswordValid =
  //   !errorCookie.includes("empty_password") &&
  //   !errorCookie.includes("incorrect_password");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const { email, password } = Object.fromEntries(data);
    const result = cookieLogin({
      login: email,
      password,
    });
    // will be undefined as async
    // console.log(`result`, result);

    // doesn't exist as rq is handleing this
    // .catch((error) => {
    //   console.error(error);
    // });
  }

  return (
    <form method="post" onSubmit={handleSubmit}>
      <fieldset disabled={isCookieLoading} aria-busy={isCookieLoading}>
        <label htmlFor="log-in-email">Email</label>
        <input
          id="log-in-email"
          type="email"
          name="email"
          autoComplete="username"
          required
        />
        <label htmlFor="log-in-password">Password</label>
        <input
          id="log-in-password"
          type="password"
          name="password"
          autoComplete="current-password"
          required
        />
        <Link to="/forgot-password" className="forgot-password-link">
          Forgot password?
        </Link>
        {/* {!isEmailValid ? (
          <p className="error-message">Invalid email. Please try again.</p>
        ) : null}
        {!isPasswordValid ? (
          <p className="error-message">Invalid password. Please try again.</p>
        ) : null} */}
        <button type="submit" disabled={isCookieLoading}>
          {isCookieLoading ? "Logging in..." : "Log in"}
        </button>
      </fieldset>
      <p className="account-sign-up-message">
        Don&#39;t have an account yet? <Link to="/sign-up">Sign up</Link>
      </p>
    </form>
  );
}
