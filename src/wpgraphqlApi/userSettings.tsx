import { gql, GraphQLClient } from "graphql-request";
import { headers, endpoint } from "./headers";

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
