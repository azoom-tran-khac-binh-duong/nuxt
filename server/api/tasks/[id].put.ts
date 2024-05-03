import { eq } from 'drizzle-orm'
import { db } from '~/server/database'
import { taskSchema } from '~/server/database/schema'
import type { Task } from '~/server/database/schema'

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event)
  const data: Partial<Task> = await readBody(event)

  await db.update(taskSchema)
    .set(data)
    .where(eq(taskSchema.id, +id))

  const updatedTask = await db.query.taskSchema.findFirst({
    where: eq(taskSchema.id, +id),
  })

  return updatedTask
})
