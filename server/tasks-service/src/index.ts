import { ApolloServer } from 'apollo-server';
import { makeExecutableSchema } from 'graphql-tools';

import typeDefs from './typedefs';
import resolvers from './resolvers';

const server = new ApolloServer({
  schema: makeExecutableSchema({
    typeDefs, resolvers
  })
});

server.listen(5002, '0.0.0.0').then(({ url }: { url: string }) => {
  console.log(`Tasks server ready at ${url}`)
});