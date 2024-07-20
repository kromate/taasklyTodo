


<template>
	<nuxt-link v-if="isLoggedIn" to="/bookings" class="flex gap-2 items-center p-4 absolute top-0 left-0 z-30">
		<ChevronLeft :size="18" />
		Back to booking
	</nuxt-link>
	<main class="min-h-screen w-screen center items-start pb-12 pt-24  relative">
		<section class="md:max-w-xl max-w-full w-full bg-white p-8 rounded-md border flex flex-col  items-center text-center">
			<div class="center p-2 bg-dark w-12 h-12 rounded-full">
				<Check color="#ffffff" />
			</div>

			<h1 class="text-2xl font-medium text-grey_two mt-4">
				This meeting is scheduled
			</h1>
			<p class="mt-3 md:text-lg">
				We sent an email with a calendar invitation with the details to everyone.
			</p>
			<hr class="w-full my-8">


			<div class="flex flex-col gap-4">
				<div v-for="(detail, index) in bookingDetailsFormatted" :key="index" class="grid grid-cols-3 text-left ">
					<div class="font-semibold">
						{{ detail.label }}
					</div>
					<div class="col-span-2">
						{{ detail.value }}
					</div>
				</div>
			</div>
		</section>
	</main>
</template>


<script setup lang="ts">
import { Check, ChevronLeft } from 'lucide-vue-next'
import { useAPI } from '@/api_factory'
import { useUser } from '@/composables/auth/user'
import { convertToCurrency } from '@/composables/utils/currency'



const { isLoggedIn } = useUser()

const booking_id = useRoute().params.id

	const { data, error } = await useAPI('/getBookingById', {
			method: 'POST',
			body: { id: booking_id }
	}) as { data: Ref<any>, error: any }

		const bookingDetails = computed(() => {
			return data.value
		})

const bookingDetailsFormatted = computed(() => {
  const details = data.value

  if (!details) return []

  return [
    { label: 'What', value: details.what },
    { label: 'When', value: details.when },
    { label: 'Who', value: details.who },
    { label: 'where', value: details.google_meet_link },
    { label: 'Description', value: details.booking_desc },
    { label: 'Price', value: details.price ? `${convertToCurrency(details.price)}` : 'Free' },
    { label: 'Additional Note', value: details.notes }
  ]
})

definePageMeta({
	layout: 'public'

})
</script>

<style scoped>

</style>
