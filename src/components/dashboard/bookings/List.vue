<template>
	<section class="p-4 flex flex-col gap-4">
		<nuxt-link v-for="booking in bookings" :key="booking.id" :to="`/booking/${booking.id}`" class="flex border border-line rounded-md hover:btn_shadow p-4">
			<div class="flex flex-col md:flex-row md:gap-14 gap-7">
				<div class="flex md:flex-col flex-wrap md:gap-2.5 gap-4 justify-between">
					<h2 class="text-sm font-semibold ">
						{{ formatDateString(booking.date) }}
					</h2>
					<h3 class=" text-sm ">
						{{ formatTimeRange({time: booking.time, duration:booking.duration}) }}
					</h3>
					<section class="flex flex-1 gap-4">
						<div class="pill">
							<Clock :size="16" />
							{{ booking.duration }}m
						</div>
						<div class="pill">
							<Banknote :size="16" />
							{{ booking.price ? convertToCurrency(booking.price) : 'Free' }}
						</div>
					</section>
				</div>
				<div class="flex flex-col gap-2.5">
					<h2 class="text-sm font-medium">
						{{ `${booking.booking_name} between ${userProfile?.name} and ${booking.contact.name}` }}
					</h2>
					<p class="text-sm">
						"{{ booking.notes ?? 'N/A' }}"
					</p>
					<div class="flex items-center">
						<span class="font-medium">Attendance:</span>
						<span class="text-base ml-2">You and {{ booking.contact.name }}</span>
					</div>
				</div>
			</div>
		</nuxt-link>
	</section>
</template>

<script setup lang="ts">
import { useUser } from '@/composables/auth/user'
import { formatDateString, formatTimeRange } from '@/composables/utils/formatter'
import { ScheduledBooking } from '@/composables/types'
import { convertToCurrency } from '@/composables/utils/currency'

const { userProfile } = useUser()


defineProps({
    bookings: {
        type: Array as PropType<ScheduledBooking[]>,
        required: true
    }
})


</script>

<style scoped>

</style>
