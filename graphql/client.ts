import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:3000/api/server",
  // uri: "http://localhost:4000",
  // uri: "https://timeplifey.vercel.app/api/server",
  cache: new InMemoryCache(),
});

export default client;
