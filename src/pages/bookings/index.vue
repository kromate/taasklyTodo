

<template>
	<main v-if="!bookingIsEmpty && !loading">
		<DashboardBookingsList :bookings="fetchedBookings" />
	</main>
	<section v-if="bookingIsEmpty && !loading" class="center flex-col min-h-[70vh] gap-4">
		<CalendarDays :size="80" />
		<h1 class="text-xl font-mediumm mt-3">
			You currently have no booking
		</h1>
		<p>Share your booking links to start receiving bookings</p>
		<nuxt-link to="booking-types" class="btn-primary">
			Go to booking type
		</nuxt-link>
	</section>
	<Skeleton v-if="loading" height="70vh" />
</template>

<script setup lang="ts">
import { CalendarDays } from 'lucide-vue-next'
import { usePageHeader } from '@/composables/utils/header'
import { useFetchBookings } from '@/composables/dashboard/bookings/fetch'





const { bookingIsEmpty, fetchUserBookings, fetchedBookings, loading } = useFetchBookings()
fetchUserBookings()

definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated', () => {
usePageHeader().setPageHeader({
	title: 'Bookings',
	description: 'See upcoming and past bookings here',
	shouldShowFab: false,
	shouldShowTab: false

})
	}]
})
</script>

<style scoped>

</style>
