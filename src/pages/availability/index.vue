<template>
	<main class="flex flex-col gap-4 p-4">
		<Skeleton v-if="loading" height="100px" />
		<section v-if="availabilities.length " class="flex flex-col gap-4">
			<article v-for="period in availabilities" :key="period.id" class="flex flex-col p-4 gap-2 border border-line rounded">
				<header class="flex items-center justify-between w-full mb-3">
					<h2 class="font-semibold md:text-xl ">
						{{ period.name }}
					</h2>
					<div class="flex gap-2.5">
						<nuxt-link :to="`/availability/${period.id}`">
							<Edit name="edit" class="w-5 cursor-pointer" />
						</nuxt-link>
						<Trash class="w-5 cursor-pointer text-red" @click="setDeleteAvailabilityId(period)" />
					</div>
				</header>

				<span v-for="grouped in period.default_days_of_week_data.filter(i=>i.active)" :key="grouped.value" class="flex   gap-4 w-full">
					<span class="font-medium w-24">{{ grouped.name }}</span><div class="flex gap-3 flex-wrap text-sm md:text-base ">
						<span v-for="(timeslot, idx) in grouped.timeSlot" :key="timeslot.startTime" class=""> <b v-if="idx !==0" class="mr-1 ">|</b>  {{ convertTo12HourFormat(timeslot.startTime) }} - {{ convertTo12HourFormat(timeslot.endTime) }} </span>
					</div>
				</span>
			</article>
		</section>

		<div v-if="!loading && !availabilities.length" class="flex flex-col gap-3 items-center text-sm text-center -scroll mt-12">
			<p class="text-dark text-lg font-bold">
				No Availability Settings found
			</p>
			<p class="text-dark">
				No Availability Settings found, click Add Availability to get started
			</p>
			<nuxt-link to="/availability/create" class="modal-btn w-auto">
				Add Availability
			</nuxt-link>
		</div>
	</main>
</template>

<script setup lang="ts">
import { Trash, Edit } from 'lucide-vue-next'
import { usePageHeader } from '@/composables/utils/header'
import { convertTo12HourFormat } from '@/composables/utils/formatter'
import { useFetchAvailabilities } from '@/composables/dashboard/availability/fetch'
import { useDeleteAvailability } from '@/composables/dashboard/availability/delete'




const { setDeleteAvailabilityId } = useDeleteAvailability()
const { availabilities, fetchAvailabilities, loading } = useFetchAvailabilities()

fetchAvailabilities()





definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated', () => {
usePageHeader().setPageHeader({
	title: 'Availability',
	description: 'Configure times when you are available for bookings.',
	btnText: 'Add Availability',
	btnCall: () => useRouter().push('/availability/create'),
	shouldShowFab: true,
	shouldShowTab: usePageHeader().isLargeScreen.value

})
	}]
})
</script>

<style scoped>

</style>
