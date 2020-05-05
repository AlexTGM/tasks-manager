import { v4 as uuidv4 } from 'uuid';

import { Project } from './models';

const projects: Project[] = ([
  { id: uuidv4(), title: 'first project', description: 'description', tasksIds: [ '1', '2' ]},
  { id: uuidv4(), title: 'second project', description: 'description', tasksIds: [ '2' ]},
  { id: uuidv4(), title: 'third project', description: 'description', tasksIds: [ '3', '5' ]},
])

export const resolvers = {
  Query: {
    listProjects: (): Project[] => 
      projects,

    findProjectById: (_, { id }: { id: string }): Project => 
      projects.find(project => project.id === id),
  },
}