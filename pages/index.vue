<template>
  <div class="home-page">
    <pre>
        {{ todoList }}
    </pre>
  </div>
</template>

<script setup lang="ts">
interface Todo {
  userId: number
  id: number
  title: string
  completed: boolean
}

const todoList = await $fetch<Todo[]>(
  'https://jsonplaceholder.typicode.com/todos',
)
</script>
