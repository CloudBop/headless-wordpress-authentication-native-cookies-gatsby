import * as React from "react";
// import { useMutation, gql } from "@apollo/client";
import AuthContent from "./AuthContent";
import { useUser } from "../hooks/useUser";
import { useMutation } from "react-query";
import { wpgraphqlCreateNewPost } from "../wpgraphqlApi/userSettings";

// const CREATE_POST = gql`
//   mutation createPost($title: String!, $content: String!) {
//     createPost(input: { title: $title, content: $content, status: PUBLISH }) {
//       post {
//         databaseId
//       }
//     }
//   }
// `;

export default function CreatePostForm() {
  const { user } = useUser();
  const canCreatePosts = Boolean(
    user?.viewer?.capabilities?.includes("publish_posts")
  );
  // const [createPost, { data, loading, error }] = useMutation(CREATE_POST);

  const { data, isLoading, error } = useMutation(wpgraphqlCreateNewPost);

  const wasPostCreated = Boolean(data?.createPost?.post?.databaseId);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const values = Object.fromEntries(data);
    // createPost({
    //   variables: values,
    // }).catch((error) => {
    //   console.error(error);
    // });
  }

  if (wasPostCreated) {
    return <p>Post successfully created.</p>;
  }

  return (
    <AuthContent>
      <h1>Create Post</h1>
      {canCreatePosts ? (
        <form method="post" onSubmit={handleSubmit}>
          <fieldset disabled={isLoading} aria-busy={isLoading}>
            <label htmlFor="create-post-title">Title</label>
            <input id="create-post-title" type="text" name="title" required />
            <label htmlFor="creat-post-content">Content</label>
            <textarea id="creat-post-content" name="content" required />
            {error instanceof Error ? (
              <p className="error-message">{error.message}</p>
            ) : null}
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Creating post..." : "Create post"}
            </button>
          </fieldset>
        </form>
      ) : (
        <p>You don&#39;t have the permissions necessary to create posts.</p>
      )}
    </AuthContent>
  );
}
