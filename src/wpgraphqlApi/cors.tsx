import { gql, GraphQLClient } from "graphql-request";
import { authHeaders, endpoint } from "./headers";

const graphQLClient = new GraphQLClient(endpoint, authHeaders);
//
const LOG_IN_COOKIE = gql`
  mutation logIn($login: String!, $password: String!) {
    loginWithCookies(input: { login: $login, password: $password }) {
      status
    }
  }
`;
export const wpgraphqlCookieLogin = async (variables: {}) => {
  try {
    const result = await graphQLClient.request(LOG_IN_COOKIE, variables);
    // const successResult = JSON.stringify(result, undefined, 2);
    // const toJson = JSON.parse(result);
    // console.log(`success result`, result);
    return result;
  } catch (error) {
    // console.log(`failed`, error);
    const errorResult = JSON.stringify(error, undefined, 2);
    const toJson = JSON.parse(errorResult);
    console.dir(toJson);

    // If GraphQL gives you a result with data, even if that result contains errors, it is not an error.
    if (!toJson?.response?.data) {
      throw new Error("Something went wrong...");
    }
    if (
      toJson?.response?.data?.loginWithCookies === null &&
      toJson?.response.errors.length > 0
    ) {
      throw new Error(toJson?.response.errors[0].message);
    }
    return toJson;
  }
};
//
const LOG_OUT_COOKIE = gql`
  mutation logOut {
    logout(input: {}) {
      status
    }
  }
`;
export const wpgraphqlCookieLogout = async () => {
  try {
    const result = await graphQLClient.request(LOG_OUT_COOKIE);
    // console.log(`result`, result);
    const successResult = JSON.stringify(result, undefined, 2);
    const toJson = JSON.parse(successResult);
    return toJson;
  } catch (error) {
    const errorResult = JSON.stringify(error, undefined, 2);
    const toJson = JSON.parse(errorResult);
    return toJson;
  }
};
//
export const GET_USER_CREDENTIAL = gql`
  query getUser {
    viewer {
      id
      databaseId
      firstName
      lastName
      email
      capabilities
    }
  }
`;
export const wpgraphqlUserCredential = async (signal: AbortSignal) => {
  const authHeadersWithSignal = { signal, ...authHeaders };
  const graphQLClient = new GraphQLClient(endpoint, authHeadersWithSignal);
  // get the user data, user will have to be authenticated
  return await graphQLClient.request(GET_USER_CREDENTIAL);
};
