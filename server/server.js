import express from 'express';
import cors from 'cors';
import { readFile } from 'node:fs/promises';
import { ApolloServer } from "@apollo/server";
import { resolvers } from './resolvers.js';
import { expressMiddleware as apolloMiddleware } from "@apollo/server/express4";

const PORT = 9000;

const app = express();

app.use(cors(), express.json());

const typeDefs = await readFile('./schema.graphql', 'utf-8');

const apolloServer = new ApolloServer({ typeDefs, resolvers });
await apolloServer.start();

async function getHttpContext({ req, res }) {
  return {};
}

// first param - middleware mount path
app.use('/graphql', apolloMiddleware(apolloServer, {
  context: getHttpContext
}))

app.listen({ port: PORT }, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Endpoint: localhost:${PORT}/graphql`)
});
