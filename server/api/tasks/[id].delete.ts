import { eq } from 'drizzle-orm'
import { db } from '~/server/database'
import { taskSchema } from '~/server/database/schema'

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event)

  await db.delete(taskSchema).where(eq(taskSchema.id, +id))

  return null
})
