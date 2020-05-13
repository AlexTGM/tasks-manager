import { PubSub } from 'apollo-server';

import { v4 as uuidv4 } from 'uuid';

import { Project } from './models';

const projects: Project[] = ([
  { id: uuidv4(), title: 'first project', description: 'description', tasksIds: [ '1', '2' ]},
  { id: uuidv4(), title: 'second project', description: 'description', tasksIds: [ '2' ]},
  { id: uuidv4(), title: 'third project', description: 'description', tasksIds: [ '3', '5' ]},
])

const pubsub = new PubSub();

export default {
  Query: {
    listProjects: (): Project[] => 
      projects,

    findProjectById: (_: any, { id }: { id: string }): Project | undefined => 
      projects.find((project: Project) => project.id === id),
  },
  Mutation: {
    createProject: (_: any, { request } : { request: {
      title: string, description: string
    }}): Project[] => {
      const newProject: Project = { 
        id: uuidv4(), 
        title: request.title,
        description: request.description, 
        tasksIds: [ '1', '2' ]
      };

      projects.push(newProject);
      pubsub.publish('PROJECT_CREATED', { projectCreated: newProject });

      return projects;
    },
  },
  Subscription: {
    projectCreated: {
      subscribe: () => pubsub.asyncIterator(['PROJECT_CREATED']),
    },
  },
}