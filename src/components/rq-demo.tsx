import React, { useEffect } from "react";
import { useMutation } from "react-query";
import { GraphQLClient, request, gql } from "graphql-request";
import useGQLReactQuery from "../hooks/useGQLQuery";
const GET_COUNTRIES = gql`
  query {
    countries {
      code
      name
    }
  }
`;

const GET_COUNTRY = gql`
  query ($code: ID!) {
    country(code: $code) {
      name
    }
  }
`;

const LOG_IN = gql`
  mutation logIn($login: String!, $password: String!) {
    loginWithCookies(input: { login: $login, password: $password }) {
      status
    }
  }
  # mutation LoginUser($email: String!, $password: String!) {
  #   login(
  #     input: {
  #       clientMutationId: "uniqueId"
  #       username: $email
  #       password: $password
  #     }
  #   ) {
  #     authToken
  #     user {
  #       id
  #       name
  #       jwtAuthToken
  #       isJwtAuthSecretRevoked
  #       jwtAuthExpiration
  #       capabilities
  #       extraCapabilities
  #     }
  #   }
  # }
`;

export default function ReactQueryDemo() {
  // Fetch data from custom hook that uses React-Query
  const { data, isLoading, error } = useGQLReactQuery("country", GET_COUNTRY, {
    code: "SE",
  });
  const {
    data: data2,
    isLoading: isLoading2,
    error: error2,
  } = useGQLReactQuery("countries", GET_COUNTRIES);

  // const headers = {
  //   headers: {
  //     // authorization: `Bearer token goes here`,
  //   },
  //   credentials: "include",
  // };
  const fetchData = async (variables) => {
    const headers: RequestInit = {
      headers: {
        // authorization: `Bearer token goes here ${token && token || 'demotoken'}`
      },
      credentials: "include",
      mode: "cors",
    };

    const endpoint = `${process.env.GATSBY_WORDPRESS_API_URL}`;
    // const endpoint2 = `${process.env.WORDPRESS_SITE_URL}/graphql`; <-- try me
    const graphQLClient = new GraphQLClient(endpoint, headers);
    try {
      console.log(`variables`, variables);
      const result = await graphQLClient.request(LOG_IN, variables);
      const successResult = JSON.stringify(result, undefined, 2);
      const toJson = JSON.parse(successResult);
      return toJson;
    } catch (error) {
      const errorResult = JSON.stringify(error, undefined, 2);
      const toJson = JSON.parse(errorResult);
      // console.dir(toJson)
      return toJson;
    }
  };
  // console.log(`fetchData`, fetchData)
  const {
    mutate: loginMutation,
    mutateAsync,
    isLoading: isLoadingAddUser,
    error: errorAddUser,
  } = useMutation(fetchData);

  // console.log(data);
  if (isLoading || isLoading2) return <div>Loading ...</div>;
  if (errorAddUser || error || error2)
    return <div>Something went wrong ...</div>;

  // useEffect(() => async () => {
  //   console.log(`result`, result)
  // }, [])
  //
  const fetchThis = async () => {
    console.log(`testing`);
    const v = await loginMutation({
      email: "one@one.com",
      login: "one@one.com",
      password: "oneone",
    });

    console.log(`v`, v);
  };
  // console.log(`data3`, data3)
  console.log(`error3`, errorAddUser);
  return (
    <div>
      <h2>Selected via query</h2>
      <button
        onClick={async () => {
          let res = await fetchThis();
          console.log(`res`, res);
        }}
      >
        Click me
      </button>
      <pre>{JSON.stringify(data)}</pre>
      <h2>All countries</h2>
      {data2?.countries.map((country) => (
        // Country: {data.country.name}
        <div key={country.name}>{country.name}</div>
      ))}
    </div>
  );
}
