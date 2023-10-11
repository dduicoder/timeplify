import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  // uri: "http://localhost:3000/api/graphql",
  uri: "https://timeplifey.vercel.app/api/grapqhl",
  cache: new InMemoryCache(),
});

export default client;
