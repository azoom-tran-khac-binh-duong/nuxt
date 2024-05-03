import type { NewTask, Task } from '~/server/database/schema'

export const useTaskStore = defineStore('task', () => {
  const tasks = ref<Task[]>([])

  const fetchTasks = async () => {
    const { data } = await useFetch<Task[]>('/api/tasks')

    if (data.value)
      tasks.value = data.value
  }

  const deleteTask = async (id: number) => {
    await $fetch(`/api/tasks/${id}`, { method: 'DELETE' })
    tasks.value = tasks.value.filter(task => task.id !== id)
  }

  const createTask = async (task: NewTask) => {
    const newTask = await $fetch<Task>('/api/tasks', {
      method: 'POST',
      body: task,
    })

    if (newTask)
      tasks.value.push(newTask)

    return newTask
  }

  const updateTask = async (id: number, task: Partial<Task>) => {
    const updatedTask = await $fetch<Task>(`/api/tasks/${id}`, {
      method: 'PUT',
      body: task,
    })

    if (updatedTask) {
      const index = tasks.value.findIndex(task => task.id === id)
      tasks.value[index] = updatedTask
    }

    return updatedTask
  }

  return {
    tasks,
    fetchTasks,
    deleteTask,
    createTask,
    updateTask,
  }
})
