import { GraphQLClient } from "graphql-request";

const authorization = `Bearer ${process.env.API_TOKEN}`;
const url = process.env.API_URL;

const client = new GraphQLClient(url, {
  headers: {
    authorization,
  },
});

export default client;
