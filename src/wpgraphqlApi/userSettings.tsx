import { gql, GraphQLClient } from "graphql-request";
import { headers, authHeaders, endpoint } from "./headers";

const SEND_PASSWORD_RESET_EMAIL = gql`
  mutation sendPasswordResetEmail($username: String!) {
    sendPasswordResetEmail(input: { username: $username }) {
      user {
        databaseId
      }
    }
  }
`;

const graphQLClient = new GraphQLClient(endpoint, headers);

export const wpgraphqlSendPasswordResetEmail = async ({ variables }) => {
  try {
    console.log(`variables`, variables);
    const result = await graphQLClient.request(
      SEND_PASSWORD_RESET_EMAIL,
      variables
    );
    // console.log(`result`, result);
    const successResult = JSON.stringify(result, undefined, 2);
    const toJson = JSON.parse(successResult);
    console.log(`toJson`, toJson);
    return toJson;
  } catch (error) {
    // gql || wpgraphql error
    const errorResult = JSON.stringify(error, undefined, 2);
    const toJson = JSON.parse(errorResult);
    // If GraphQL gives you a result with data, even if that result contains errors, it is not an error.
    if (!toJson?.response?.data) {
      throw new Error();
    }
    if (
      toJson?.response?.data?.sendPasswordResetEmail === null &&
      toJson?.response.errors.length > 0
    ) {
      throw new Error(toJson?.response.errors[0].message);
    }
    return toJson;
  }
};

const RESET_PASSWORD = gql`
  mutation resetUserPassword(
    $key: String!
    $login: String!
    $password: String!
  ) {
    resetUserPassword(
      input: { key: $key, login: $login, password: $password }
    ) {
      user {
        databaseId
      }
    }
  }
`;
export async function wpgraphqlResetPassword({ variables }) {
  try {
    console.log(`variables`, variables);
    const result = await graphQLClient.request(RESET_PASSWORD, variables);
    // console.log(`result`, result);
    const successResult = JSON.stringify(result, undefined, 2);
    const toJson = JSON.parse(successResult);
    console.log(`toJson`, toJson);
    return toJson;
  } catch (error) {
    // gql || wpgraphql error
    const errorResult = JSON.stringify(error, undefined, 2);
    const toJson = JSON.parse(errorResult);
    // If GraphQL gives you a result with data, even if that result contains errors, it is not an error.
    if (!toJson?.response?.data) {
      throw new Error();
    }
    if (
      toJson?.response?.data?.sendPasswordResetEmail === null &&
      toJson?.response.errors.length > 0
    ) {
      throw new Error(toJson?.response.errors[0].message);
    }
    return toJson;
  }
}

//
const UPDATE_PROFILE = gql`
  mutation updateProfile(
    $id: ID!
    $firstName: String!
    $lastName: String!
    $email: String!
  ) {
    updateUser(
      input: {
        id: $id
        firstName: $firstName
        lastName: $lastName
        email: $email
      }
    ) {
      user {
        id
        databaseId
        firstName
        lastName
        email
        capabilities
      }
    }
  }
`;

export async function wpgraphqlUpdateUserProfile({ variables }) {
  const graphQLClient = new GraphQLClient(endpoint, authHeaders);
  try {
    console.log(`variables`, variables);
    const result = await graphQLClient.request(UPDATE_PROFILE, variables);
    // console.log(`result`, result);
    const successResult = JSON.stringify(result, undefined, 2);
    const toJson = JSON.parse(successResult);
    console.log(`toJson`, toJson);
    return toJson;
  } catch (error) {
    // gql || wpgraphql error
    const errorResult = JSON.stringify(error, undefined, 2);
    const toJson = JSON.parse(errorResult);
    // If GraphQL gives you a result with data, even if that result contains errors, it is not an `total` error.
    if (!toJson?.response?.data) {
      throw new Error("Something went wrong...");
    }

    if (
      toJson?.response?.data?.sendPasswordResetEmail === null &&
      toJson?.response.errors.length > 0
    ) {
      // throw errors to react-query
      throw new Error(toJson?.response.errors[0].message);
    }

    return toJson;
  }
}
