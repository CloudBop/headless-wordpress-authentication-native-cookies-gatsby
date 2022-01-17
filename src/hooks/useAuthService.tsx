import { navigate } from "gatsby";
import { User } from "../../types/types";
// import { useCustomToast } from "../components/app/hooks/useCustomToast";
// import { useUser } from "../hooks/useUser";
import {
  wpgraphqlCookieLogin,
  wpgraphqlCookieLogout,
} from "../wpgraphqlApi/cors";
import { useUser } from "./useUser";

interface UseAuth {
  signin: (email: string, password: string) => Promise<AuthResponseType>;
  // signup: (email: string, password: string) => Promise<void>;
  signout: () => void;
}

type UserResponse = { user: User };
type ErrorResponse = { message: string };
type AuthResponseType =
  | UserResponse
  | ErrorResponse
  | { loginWithCookies: { status: string } };

export function useAuthService(): UseAuth {
  const SERVER_ERROR = "There was an error contacting the server.";
  // const toast = useCustomToast();
  const { clearUser, updateUser, updateUserToo } = useUser();

  async function signin(
    email: string,
    password: string
  ): Promise<AuthResponseType> {
    const response = wpgraphqlCookieLogin({ login: email, password });
    response
      .then((data) => {
        //
        if (data?.loginWithCookies?.status === "SUCCESS") {
          updateUserToo();
        }
        //
        else {
          // console.log(`data`, data);
          const { response, request } = data;
          // console.log(`response`, response);
          const isLoginSuccess = Boolean(response?.data?.loginWithCookies);
          // console.log(`isLoginSuccess`, isLoginSuccess);
          const loginStatus = Boolean(response?.data?.status);

          if (isLoginSuccess) {
            console.log("LOGIN USER");
          }

          const loginFailMessages = response?.errors;
        }
      })
      .catch((err) => console.log(err));
    return response;
  }
  // async function signup(email: string, password: string): Promise<void> {
  // }

  function signout(): void {
    // clear user from stored user data
    const response = wpgraphqlCookieLogout();
    response
      .then((data) => {
        //
        // console.log(`data`, data);
        if (data?.logout?.status === "SUCCESS") {
          clearUser();
        }
        //
        else {
          // console.log(`data`, data);
          const { response, request } = data;
          console.log(`response`, response);
          // const isLoginSuccess = Boolean(response?.data?.loginWithCookies);
          // // console.log(`isLoginSuccess`, isLoginSuccess);
          // const loginStatus = Boolean(response?.data?.status);
          // if (isLoginSuccess) {
          //   console.log("LOGIN USER");
          // }
          // const loginFailMessages = response?.errors;
        }
      })
      .catch((err) => console.log(err));
  }

  // Return the user object and auth methods
  return {
    signin,
    // signup,
    signout,
  };
}
