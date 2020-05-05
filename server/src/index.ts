import { makeExecutableSchema } from 'graphql-tools';

import { ApolloServer } from 'apollo-server';

import { 
  typeDefs as ProjectsTypeDefs, 
  resolvers as ProjectsResolvers
} from './projects';

import { 
  typeDefs as TasksTypeDefs, 
  resolvers as TasksResolvers
} from './tasks';

const schema = makeExecutableSchema({
  typeDefs: [ ProjectsTypeDefs, TasksTypeDefs ], 
  resolvers: [ ProjectsResolvers, TasksResolvers ]
});

const server = new ApolloServer({ schema });

server.listen({ port: 5000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
});