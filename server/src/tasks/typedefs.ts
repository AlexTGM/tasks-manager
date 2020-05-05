import { gql } from 'apollo-server';

export const typeDefs = gql`
type Task {
  id: ID!
  title: String
  description: String
}

type Query {
  listTasks: [Task]
  findTaskById(id: ID!): Task
  findTasksByIds(ids: [ID]): [Task]
}
`