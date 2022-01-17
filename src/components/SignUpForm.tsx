import * as React from "react";

import { Link } from "gatsby";
import { useMutation } from "react-query";
import { wpgraphqlRegisterNewUser } from "../wpgraphqlApi/userSettings";

export default function SignUpForm() {
  const {
    data,
    mutate: registerUser,
    isLoading,
    error,
  } = useMutation(wpgraphqlRegisterNewUser);

  const wasSignUpSuccessful = Boolean(data?.registerUser?.user?.databaseId);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const values = Object.fromEntries(data);
    // delagate side-effects to react-query
    registerUser({
      variables: values,
    });
  }

  if (wasSignUpSuccessful) {
    return (
      <p>
        Thanks! Check your email – an account confirmation link has been sent to
        you.
      </p>
    );
  }

  return (
    <form method="post" onSubmit={handleSubmit}>
      <fieldset disabled={isLoading} aria-busy={isLoading}>
        <label htmlFor="sign-up-first-name">First name</label>
        <input
          id="sign-up-first-name"
          type="text"
          name="firstName"
          autoComplete="given-name"
          required
        />
        <label htmlFor="sign-up-last-name">Last name</label>
        <input
          id="sign-up-first-name"
          type="text"
          name="lastName"
          autoComplete="family-name"
          required
        />
        <label htmlFor="sign-up-email">Email</label>
        <input
          id="sign-up-email"
          type="email"
          name="email"
          autoComplete="username"
          required
        />
        {error instanceof Error ? (
          error.message.includes("This username is already registered") ? (
            <p className="error-message">
              You&#39;re already signed up! <Link to="/log-in">Log in</Link>
            </p>
          ) : (
            <p className="error-message">{error.message}</p>
          )
        ) : null}
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Signing up..." : "Sign up"}
        </button>
      </fieldset>
      <p>
        Already have an account? <Link to="/log-in">Log in</Link>
      </p>
    </form>
  );
}
