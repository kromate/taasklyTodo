
<template>
	<Modal
		modal="$atts.modal"
		title="Start Goal"
		:is-full-height="false"

	>
		<div class="field relative">
			<label for="start">Start Date</label>
			<DateInput id="start" v-model="start_date" placeholder="When do you want to start?" type="date" />
		</div>

		<div class="grid grid-cols-1 gap-4 mt-6">
			<button class="modal-btn text-light " :disabled="loading || !start_date" @click="startGoal()">
				<span v-if="!loading"> Start </span>
				<Spinner v-else />
			</button>
		</div>
	</Modal>
</template>

<script setup lang="ts">
import { useConfirmationModal } from '@/composables/core/confirmation'
import { useStartGoal } from '@/composables/dashboard/goals/start'

const { initStartGoal, loading, startGoal, start_date } = useStartGoal()


</script>

<style>

</style>
