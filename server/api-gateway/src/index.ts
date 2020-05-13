import {
  mergeSchemas,
  delegateToSchema,
} from 'graphql-tools';

import { ApolloServer, gql } from 'apollo-server';
import { createConnectionAsync } from './connection';

const linkTypeDefs = gql`
  extend type Project {
    tasks: [Task]
  }
`;

(async () => {
  const projectsSchema = await createConnectionAsync('0.0.0.0:5001');
  const tasksSchema = await createConnectionAsync('0.0.0.0:5002');

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

  server.listen(5000).then(({ url }: { url: string }) => {
    console.log(`Server ready at ${url}`)
  });
})();