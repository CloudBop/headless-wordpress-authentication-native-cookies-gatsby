import * as React from "react";
import { Link, navigate } from "gatsby";
import { useAuthService } from "../hooks/useAuthService";
import { useUser } from "../hooks/useUser";
import { useMutation } from "react-query";
import { wpgraphqlCookieLogin } from "../wpgraphqlApi/cors";

export default function LogInForm() {
  // const { signin } = useAuthService();
  const { user, updateUserToo, userLoading, userError } = useUser();
  const {
    mutate: loginUser,
    error: loginCookieError,
    isLoading: isLoginCookieLoading,
  } = useMutation(wpgraphqlCookieLogin, {
    onSuccess: (data) => {
      // console.log(data);
      updateUserToo();
    },
  });

  const errorMessage =
    (loginCookieError instanceof Error && loginCookieError?.message) || "";
  console.log(`errorMessage`, errorMessage);

  const isEmailValid =
    !errorMessage.includes("empty_email") &&
    !errorMessage.includes("empty_username") &&
    !errorMessage.includes("invalid_email") &&
    !errorMessage.includes("invalid_username");
  const isPasswordValid =
    !errorMessage.includes("empty_password") &&
    !errorMessage.includes("incorrect_password");

  if (user?.viewer) navigate("/members");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const { email, password } = Object.fromEntries(data);
    const res = await loginUser({ login: email, password });
    console.log("🚀 ~ file: LogInForm.tsx ~ line 15 ~ handleSubmit ~ res", res);
  }

  return (
    <form method="post" onSubmit={handleSubmit}>
      <fieldset disabled={userLoading} aria-busy={userLoading}>
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
        {!isEmailValid ? (
          <p className="error-message">Invalid email. Please try again.</p>
        ) : null}
        {!isPasswordValid ? (
          <p className="error-message">Invalid password. Please try again.</p>
        ) : null}
        <button type="submit" disabled={isLoginCookieLoading}>
          {isLoginCookieLoading ? "Logging in..." : "Log in"}
        </button>
      </fieldset>
      <p className="account-sign-up-message">
        Don&#39;t have an account yet? <Link to="/sign-up">Sign up</Link>
      </p>
    </form>
  );
}
