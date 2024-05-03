<template>
  <div class="home-page">
    <header class="header-container">
      <h1 class="title">
        Nuxt Todo
      </h1>
    </header>
    <main class="main-container">
      <form
        class="todo-form"
        @submit.prevent="handleCreateTask"
      >
        <input
          v-model="taskForm.text"
          class="input"
          type="text"
          name="task"
        >
        <input
          class="button -submit"
          type="submit"
          value="Save"
        >
      </form>
      <div class="divider" />
      <section class="todo-list">
        <p
          v-if="!tasks.length"
          class="message"
        >
          No task found!
        </p>
        <div
          v-for="task in tasks"
          :key="task.id"
          class="todo-item"
        >
          <p
            class="text"
            :class="{
              '-done': task.done,
            }"
          >
            {{ task.text }}
          </p>

          <div class="group-action">
            <icon
              class="button -update"
              name="i-heroicons-check"
              size="20"
              @click="updateTask(task.id, { done: !task.done })"
            />
            <icon
              class="button -delete"
              name="i-heroicons-trash"
              size="20"
              @click="deleteTask(task.id)"
            />
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import type { NewTask } from '~/server/database/schema'

const taskStore = useTaskStore()
const { fetchTasks, deleteTask, createTask, updateTask } = taskStore
const { tasks } = storeToRefs(taskStore)

const taskForm = reactive<NewTask>({
  text: '',
})

const resetTaskForm = () => {
  taskForm.text = ''
}

await fetchTasks()

const handleCreateTask = async () => {
  if (!taskForm.text) return alert('Task is required')

  const newTask = await createTask(taskForm)

  if (newTask) {
    resetTaskForm()
  }
}
</script>

<style lang="scss" scoped>
.header-container {
  color: $color-light;
  padding: $spacing-md;
  text-align: center;
  background-color: $color-primary;
}

.main-container {
  margin: $spacing-md auto;
  padding: $spacing-md;

  @include media-query(sm) {
    max-width: 600px;
  }
}

.todo-form {
  display: flex;
  gap: $spacing-md;

  > .input {
    padding: $spacing-sm;
    margin: $spacing-md 0;
    font-size: 1.5rem;
    flex: 1;
  }

  > .button {
    padding: $spacing-sm $spacing-md;
    margin: $spacing-md 0;
    font-size: 1.5rem;
    background-color: $color-primary;
    color: $color-light;
    border: none;
    border-radius: $radius-sm;
    box-shadow: $shadow-sm;
    cursor: pointer;
  }
}

.divider {
  height: 1px;
  background-color: $color-dark;
  margin: $spacing-md 0;
}

.todo-list {
  > .message {
    text-align: center;
  }
}

.todo-item {
  padding: $spacing-md;
  margin: $spacing-md 0;
  color: $color-light;
  background-color: $color-primary;
  border-radius: $radius-sm;
  box-shadow: $shadow-sm;
  display: flex;
  justify-content: space-between;
  align-items: center;

  > .text {
    font-size: 1.5rem;

    &.-done {
      text-decoration: line-through;
    }
  }

  > .group-action {
    display: flex;
    gap: $spacing-md;
  }

  > .group-action > .button {
    cursor: pointer;

    &.-update {
      color: $color-secondary;
    }
  }
}
</style>
