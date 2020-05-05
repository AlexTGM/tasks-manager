import { makeExecutableSchema, mergeSchemas, delegateToSchema } from 'graphql-tools';

import { ApolloServer, gql } from 'apollo-server';

import { 
  typeDefs as ProjectsTypeDefs, 
  resolvers as ProjectsResolvers
} from './projects';

import { 
  typeDefs as TasksTypeDefs, 
  resolvers as TasksResolvers
} from './tasks';

const linkTypeDefs = gql`
  extend type Project {
    tasks: [Task]
  }
`;

const projectsSchema = makeExecutableSchema({
  typeDefs: ProjectsTypeDefs,
  resolvers: ProjectsResolvers
})

const tasksSchema = makeExecutableSchema({
  typeDefs: TasksTypeDefs,
  resolvers: TasksResolvers
})

const schema = mergeSchemas({
  subschemas: [
    { schema: projectsSchema },
    { schema: tasksSchema }
  ],
  typeDefs: linkTypeDefs,
  resolvers: {
    Project: {
      tasks: {
        fragment: `... on Project { tasksIds }`,
        resolve(parent, args, context, info) {
          return delegateToSchema({
            schema: tasksSchema,
            operation: 'query',
            fieldName: 'findTasksByIds',
            args: {
              ids: parent.tasksIds
            },
            context,
            info
          })
        }
      }
    }
  }
});

const server = new ApolloServer({ schema });

server.listen({ port: 5000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
});