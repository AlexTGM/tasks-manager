import { gql } from 'apollo-server';

export const typeDefs = gql`
type Project {
  id: ID!
  title: String
  description: String
}

type Query {
  listProjects: [Project]
  findProjectById(id: ID!): Project
}
`