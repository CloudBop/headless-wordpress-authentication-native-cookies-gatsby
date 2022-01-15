import * as React from "react";
import { useMutation } from "react-query";
import { wpgraphqlSendPasswordResetEmail } from "../wpgraphqlApi/userSettings";

export default function SendPasswordResetEmailForm() {
  const {
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isPaused,
    isSuccess,
    mutate,
    mutateAsync,
    reset,
    status,
  } = useMutation(wpgraphqlSendPasswordResetEmail);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const { email } = Object.fromEntries(data);
    mutate({
      variables: {
        username: email,
      },
    });
  }
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator
  const wasEmailSent =
    // returns as 0 if successful (basically coerce 0 to truthy)
    data?.sendPasswordResetEmail?.user?.databaseId ?? undefined;
  if (wasEmailSent || wasEmailSent === 0) {
    return (
      <p style={{ backgroundColor: "#264d4b", color: "#92dddb" }}>
        Please check your email. A password reset link has been sent to you.
      </p>
    );
  }

  return (
    <form method="post" onSubmit={handleSubmit}>
      <p>
        Enter the email associated with your account and you&#39;ll be sent a
        link to reset your password.
      </p>
      <fieldset disabled={isLoading} aria-busy={isLoading}>
        <label htmlFor="password-reset-email">Email</label>
        <input
          id="password-reset-email"
          type="email"
          name="email"
          autoComplete="email"
          required
        />
        {error instanceof Error ? (
          <p className="error-message">{error?.message}</p>
        ) : null}
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Sending..." : "Send password reset email"}
        </button>
      </fieldset>
    </form>
  );
}
