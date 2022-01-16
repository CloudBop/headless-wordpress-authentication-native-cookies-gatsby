import * as React from "react";
import { useMutation } from "react-query";

// import { User } from "../hooks/deprectated/useAuth";
import { useUser } from "../hooks/useUser";
import { wpgraphqlUpdateUserProfile } from "../wpgraphqlApi/userSettings";

export default function ProfileForm() {
  const { user, updateUser } = useUser();
  const {
    viewer: { firstName, lastName, email, id },
  } = user;
  // const [updateProfile, { data, loading, error }] = useMutation(UPDATE_PROFILE);

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
  } = useMutation(wpgraphqlUpdateUserProfile, {
    onSuccess: (data, testing, ctx) => {
      console.log(
        "🚀 ~ file: ProfileForm.tsx ~ line 49 ~ ProfileForm ~ data,testing,ctx",
        data,
        testing,
        ctx
      );

      const { firstName, lastName, email, id, databaseId, capabilities } =
        data.updateUser.user;
      updateUser({
        viewer: { firstName, lastName, email, id, databaseId, capabilities },
      });
    },
  });

  const wasProfileUpdatedBut0sequalsFalse = Boolean(
    data?.updateUser?.user?.databaseId
  );
  //
  const wasProfileUpdated = data?.updateUser?.user?.databaseId ?? undefined;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const values = Object.fromEntries(data);
    mutate({
      variables: { id, ...values },
    });
  }

  return (
    <form method="post" onSubmit={handleSubmit}>
      {wasProfileUpdated ? (
        <p className="profile-update-confirmation">
          ✅ Profile details have been updated.
        </p>
      ) : null}
      <fieldset disabled={isLoading} aria-busy={isLoading}>
        <label htmlFor="profile-first-name">First Name</label>
        <input
          id="profile-first-name"
          type="text"
          name="firstName"
          defaultValue={firstName || ""}
          autoComplete="given-name"
        />
        <label htmlFor="profile-last-name">Last Name</label>
        <input
          id="profile-last-name"
          type="text"
          name="lastName"
          defaultValue={lastName || ""}
          autoComplete="family-name"
        />
        <label htmlFor="profile-email">Email</label>
        <input
          id="profile-email"
          type="email"
          name="email"
          defaultValue={email || ""}
          autoComplete="email"
        />
        {error instanceof Error ? (
          <p className="error-message">{error.message}</p>
        ) : null}
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Updating..." : "Update"}
        </button>
      </fieldset>
    </form>
  );
}
