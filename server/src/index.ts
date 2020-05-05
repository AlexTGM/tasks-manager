import { makeExecutableSchema } from 'graphql-tools';

import { ApolloServer } from 'apollo-server';

import { 
  typeDefs as ProjectsTypeDefs, 
  resolvers as ProjectsResolvers
} from './projects';

const schema = makeExecutableSchema({
  typeDefs: [ ProjectsTypeDefs ], 
  resolvers: [ ProjectsResolvers ]
});

const server = new ApolloServer({ schema });

server.listen({ port: 5000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
});