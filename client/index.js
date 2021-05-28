import { GraphQLClient } from "graphql-request";

const isMocked = process.env.API_MOCKING === "enabled";
const authorization = isMocked ? undefined : `Bearer ${process.env.API_TOKEN}`;
const url = isMocked ? "http://api.test" : process.env.API_URL;

const client = new GraphQLClient(url, {
  headers: {
    authorization,
  },
});

export default client;
