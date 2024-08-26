<template>
	<div class="w-full h-full p-4 flex flex-col gap-5">
		<main class="kanban-columns gap-4">
			<PagesDashboardTodosColumn
				v-for="column in groupTodosByDate"
				:key="column.date"
				:date="column.date"
				:tasks="column.tasks"
			/>
		</main>

		{{ }}
	</div>
</template>


<script setup lang="ts">
import { usePageHeader } from '@/composables/utils/header'
import { type Column as ColumnType, type Task } from '@/composables/types'
import { dummyTasks } from '@/composables/helpers/todo'
import { useWeekDates } from '@/composables/dashboard/todo'
import { fetchAllUserActiveTodos } from '@/composables/dashboard/todo/fetch'

const { fetchUsersTodos, loading, groupTodosByDate } = fetchAllUserActiveTodos()


await fetchUsersTodos()




const { weekDates } = useWeekDates()

const columns = ref<ColumnType[]>([])

const visibleColumns = ref([] as any[])





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
