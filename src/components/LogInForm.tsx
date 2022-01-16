import * as React from "react";
import { Link, navigate } from "gatsby";
import { useAuthService } from "../hooks/useAuthService";
import { useUser } from "../hooks/useUser";

export default function LogInForm() {
  const { signin } = useAuthService();
  const { user, updateUser } = useUser();

  if (user?.viewer) navigate("/members");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const { email, password } = Object.fromEntries(data);
    const res = await signin(`${email}`, `${password}`);
    console.log("🚀 ~ file: LogInForm.tsx ~ line 15 ~ handleSubmit ~ res", res);
  }

  return (
    <form method="post" onSubmit={handleSubmit}>
      <fieldset
      // disabled={isCookieLoading} aria-busy={isCookieLoading}
      >
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
        <button
          type="submit" //disabled={isCookieLoading}
        >
          {
            "Log in"
            // isCookieLoading ? "Logging in..." : "Log in"
          }
        </button>
      </fieldset>
      <p className="account-sign-up-message">
        Don&#39;t have an account yet? <Link to="/sign-up">Sign up</Link>
      </p>
    </form>
  );
}
