import { Task } from "./models"

const tasks: Task[] = ([
  { id: '1', title: 'first task', description: 'description'},
  { id: '2', title: 'second task', description: 'description'},
  { id: '3', title: 'third task', description: 'description'},
  { id: '4', title: 'fourth task', description: 'description'},
  { id: '5', title: 'fifth task', description: 'description'},
  { id: '6', title: 'sixth task', description: 'description'},
])

export default {
  Query: {
    listTasks: (): Task[] => tasks,

    findTaskById: (_: any, { id }: { id: string }): Task | undefined =>
      tasks.find(task => task.id === id),

    findTasksByIds: (_: any, { ids }: { ids: string[] }): Task[] =>
      tasks.filter(task => ids.includes(task.id)),
  }
}