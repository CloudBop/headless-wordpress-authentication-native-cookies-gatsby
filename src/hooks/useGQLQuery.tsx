import { useQuery, useMutation } from "react-query";
import { GraphQLClient, request } from "graphql-request";

const useGQLReactQuery = (key, query, variables = {}, config = {}) => {
  //
  let token = null;
  const endpoint = "https://countries.trevorblades.com/";
  const headers = {
    headers: {
      authorization: `Bearer token goes here ${
        (token && token) || "demotoken"
      }`,
    },
  };
  const operationIsQuery = query.loc.source.body.includes("query");
  const operationIsMutation = query.loc.source.body.includes("mutation");
  // const operationIsSubscription = query.loc.source.body.includes('subscription')
  //
  // console.log(`operationIsQuery`, operationIsQuery)
  if (operationIsQuery) {
    // needed for variables and header config
    const graphQLClient = new GraphQLClient(endpoint, headers);
    const fetchData = async () => await graphQLClient.request(query, variables);

    return useQuery(key, fetchData, config);
    // for simple non auth query requests one liner should work
    // const fetchData = async () => await request(endpoint, query, variables);
  } else if (operationIsMutation) {
    console.log(`operationIsMutation`, operationIsMutation);
    const graphQLClient = new GraphQLClient(
      `${process.env.GATSBY_WORDPRESS_SITE_URL}/graphql`,
      headers
    );
    const fetchData = async () =>
      await graphQLClient.request(
        `${process.env.GATSBY_WORDPRESS_SITE_URL}/graphql`,
        query,
        variables
      );
    console.log(`fetchData`, fetchData);
    return useMutation(fetchData, config);
  } else {
    // TYPE SUBSCRIPTION - NOT/APPLICABLE
  }
};

export default useGQLReactQuery;
