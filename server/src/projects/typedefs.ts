import { gql } from 'apollo-server';

export const typeDefs = gql`
type Project {
  id: ID!
  title: String
  description: String
  tasksIds: [ID]
}

type Query {
  listProjects: [Project]
  findProjectById(id: ID!): Project
}

type Mutation {
  createProject(request: CreateProject!): [Project]
  linkTasks(ids: [ID]!): Project
}

input CreateProject {
  title: String
  description: String
}

type Subscription {
  projectCreated: Project
}
`