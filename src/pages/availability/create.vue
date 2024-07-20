<template>
	<div class="flex items-center justify-between w-full gap-4 p-4   text-dark relative">
		<div class="flex relative ">
			<input ref="availabilityInput" v-model="availabilityName" type="text" class="input-field w-auto pr-10">
		</div>


		<hr class="w-full h-[1px] absolute left-0 border border-dark  top-[75px]">
	</div>

	<main class="px-7 pt-8 mb-60">
		<DashboardAvailabilityCreate :edit="false" />
	</main>
</template>

<script setup lang="ts">

import { useCreateAvailability } from '@/composables/dashboard/availability/create'
import { usePageHeader } from '@/composables/utils/header'
const { create, loading, availabilityName, clear_service_availability_data } = useCreateAvailability()


const isTitleEditable = ref(true)
const availabilityInput = ref(null) as any

watch(isTitleEditable, (newVal) => {
	if (newVal && availabilityInput.value) {
    availabilityInput.value.focus()
  }
})
watch(() => useRoute().name, () => {
	clear_service_availability_data()
	}, { immediate: true }
)



definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated', () => {
	usePageHeader().setPageHeader({
	title: 'Create Availability',
	description: 'Create your availability settings.',
	btnText: 'Create',
	btnCall: () => useCreateAvailability().create(),
	shouldShowFab: false,
	shouldShowTab: true
})
	}]
})
</script>

<style scoped>

</style>
