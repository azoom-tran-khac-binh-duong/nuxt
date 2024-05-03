import { db } from '../database'

export default defineEventHandler(async () => {
  const tasks = await db.query.taskSchema.findMany()
  return tasks
})
