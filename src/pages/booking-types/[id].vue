<template>
	<main class="flex flex-col gap-4 p-4">
		<DashboardBookingTypesCreate :edit="false" :loading="idLoading" />
	</main>
</template>



<script setup lang="ts">
import { usePageHeader } from '@/composables/utils/header'
import { useEditBookingType } from '@/composables/dashboard/bookingTypes/edit'


const { loading, idLoading, initBookingTypeEdit } = useEditBookingType()

watch(() => useRoute().params.id, async (newId) => {
	initBookingTypeEdit(newId as string)
	}, { immediate: true }
)

definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated', () => {
usePageHeader().setPageHeader({
	title: 'Edit Booking Type',
	description: 'Edit a booking type',
	btnText: 'Save',
	btnCall: () => useEditBookingType().edit(),
	loading: useEditBookingType().loading,
	shouldShowFab: false,
	shouldShowTab: true

})
	}]
})
</script>

<style scoped>

</style>
