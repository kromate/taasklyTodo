<template>
	<section>
		<section v-if="!goalDetails.started" class="center flex-col  gap-4">
			<CheckSquare :size="80" />
			<h1 class="text-xl font-bold mt-3">
				Start the goal to generate todos
			</h1>
			<p> Click the button below to start this Goal </p>
			<button to="/goals/create" class="btn-primary" @click="initStartGoal(goalDetails)">
				Start Goal
			</button>
		</section>
	</section>
</template>

<script setup>
import { CheckSquare } from 'lucide-vue-next'
import { useFetchGoalsById } from '@/composables/dashboard/goals/id'
import { useStartGoal } from '@/composables/dashboard/goals/start'

const { initStartGoal } = useStartGoal()
const { goalDetails } = useFetchGoalsById()
</script>

<style lang="scss" scoped></style>
