<template>
	<div class="w-full h-full p-4 flex flex-col gap-5">
		<header class="w-full flex flex-wrap gap-4 justify-end items-end">
			<button class="btn">
				Generate my weekly todo
			</button>
			<button class="btn bg-dark text-light ">
				Sync with Calendar
			</button>
		</header>
		<main class="kanban-columns gap-4">
			<PagesDashboardTodosColumn
				v-for="column in visibleColumns"
				:key="column.date"
				:date="column.date"
				:tasks="column.tasks"
				@add-task="addTask"
				@delete-task="deleteTask"
			/>
			<!-- @update-task="updateTask" -->
		</main>
	</div>
</template>


<script setup lang="ts">
import { usePageHeader } from '@/composables/utils/header'
import { type Column as ColumnType, type Task } from '@/composables/types'
import { dummyTasks } from '@/composables/helpers/todo'
import { useWeekDates } from '@/composables/dashboard/todo'
import { useFetchUserGoogleCalEvents } from '@/composables/dashboard/integrations/googleCal/fetch'

const { fetchUserGoogleCalEvents } = useFetchUserGoogleCalEvents()

fetchUserGoogleCalEvents()

const { weekDates } = useWeekDates()

const columns = ref<ColumnType[]>([])

const visibleColumns = ref([] as any[])

// Init function to distribute tasks across the week and assign to visibleColumns
const initColumns = () => {
  visibleColumns.value = weekDates.value.map((date, index) => {
    const tasksForDay = dummyTasks.filter((_, taskIndex) => taskIndex % 7 === index)
    return {
      date,
      tasks: tasksForDay.map((task) => ({
        ...task
      }))
    }
  })
}

// Call initColumns to initialize visibleColumns when the component is created
initColumns()

const addTask = (date: string, task: Task) => {
  const column = visibleColumns.value.find((col) => col.date === date)
  if (column) {
    column.tasks.push(task)
  }
}

const updateTask = (date: string, taskId: string, updatedTask: Partial<Task>) => {
  console.log('updateTask', date, taskId, updatedTask)
  const column = visibleColumns.value.find((col) => col.date === date)
  if (column) {
    const taskIndex = column.tasks.findIndex((task) => task.id === taskId)
    if (taskIndex !== -1) {
      column.tasks[taskIndex] = { ...column.tasks[taskIndex], ...updatedTask }
    }
  }
}

const deleteTask = (date: string, taskId: string) => {
  const column = visibleColumns.value.find((col) => col.date === date)
  if (column) {
    column.tasks = column.tasks.filter((task) => task.id !== taskId)
  }
}

definePageMeta({
  layout: 'dashboard',
  middleware: ['is-authenticated', () => {
    usePageHeader().setPageHeader({
      title: 'Todos',
      description: 'Manage your todos here',
      shouldShowFab: false,
      shouldShowTab: false
    })
  }]
})
</script>

<style scoped>
.kanban-columns {
  display: flex;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.kanban-columns::-webkit-scrollbar {
  display: none;
}
</style>
