<template>
	<main class="flex flex-col gap-4 p-4">
		<DashboardBookingTypesCreate :edit="false" :loading="false" />
	</main>
</template>



<script setup lang="ts">
import { usePageHeader } from '@/composables/utils/header'
import { useCreateBookingType } from '@/composables/dashboard/bookingTypes/create'



definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated', () => {
usePageHeader().setPageHeader({
	title: 'Create Booking Type',
	description: 'Create a new booking type',
	btnText: 'create  ',
	btnCall: () => useCreateBookingType().create(),
	loading: useCreateBookingType().loading,
	shouldShowFab: false,
	shouldShowTab: true

})
}, () => useCreateBookingType().resetForm()


	]
})
</script>

<style scoped>

</style>
