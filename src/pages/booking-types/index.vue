<template>
	<main class="flex flex-col gap-4 p-4">
		<TypeList v-if="!loading" :booking-types="bookingTypes" />
		<div v-else class="flex flex-col gap-4">
			<Skeleton v-for="n in 3" :key="n" height="122px" radius="6px" />
		</div>
	</main>
</template>

<script setup lang="ts">
import { usePageHeader } from '@/composables/utils/header'
import { useFetchbookingTypes } from '@/composables/dashboard/bookingTypes/fetch'
import TypeList from '@/components/dashboard/bookingTypes/TypeList.vue'


const { bookingTypes, fetchbookingTypes, loading } = useFetchbookingTypes()

onMounted(() => {
	fetchbookingTypes()
})

definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated', () => {
usePageHeader().setPageHeader({
	title: 'Booking Types',
	description: 'Configure the types of bookings you offer.',
	btnText: 'Add Booking',
	btnCall: () => useRouter().push('/booking-types/create'),
	shouldShowFab: true,
	shouldShowTab: usePageHeader().isLargeScreen.value

})
	}]
})
</script>

<style scoped>

</style>
