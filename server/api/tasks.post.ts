import { eq } from 'drizzle-orm'
import { db } from '../database'
import { taskSchema } from '../database/schema'
import type { NewTask } from '../database/schema'

export default defineEventHandler(async (event) => {
  const data: NewTask = await readBody(event)

  const result = await db.insert(taskSchema).values(data)

  const newTask = await db.query.taskSchema.findFirst({
    where: eq(taskSchema.id, result[0].insertId),
  })

  return newTask
})
