import { gql } from 'apollo-server';

export default gql`
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