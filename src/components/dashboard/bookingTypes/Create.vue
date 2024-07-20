<template>
	<section v-if="!loading" class="flex flex-col md:flex-row  w-full gap-5   rounded-md">
		<section class="md:w-1/2 w-full">
			<div class="flex flex-col gap-4">
				<div class="flex flex-col gap-6 px-4 py-6 border rounded-md border-dark">
					<div class="relative w-full field">
						<label for="service-name">Name</label>
						<input id="service-name" v-model="createBookingTypeForm.name.value" placeholder="Enter service Name" type="text" class="input-field" required>
					</div>
					<div class="relative field">
						<label for="service-description">Description</label>
						<textarea id="service-description" v-model="createBookingTypeForm.desc.value" placeholder="Enter a brief description of your service" rows="3" class="input-textarea" />
					</div>
					<div class="relative w-full field">
						<label for="service-name">Availability</label>

						<Skeleton v-if="availabilityLoading" height="48px" radius="6px" />
						<div v-if="!availabilityLoading && availabilities.length" class="w-full">
							<select v-model="createBookingTypeForm.availability_id.value" class="input-field" required>
								<option value="" disabled>
									Select Availability
								</option>
								<option v-for="period in availabilities" :key="period.id" :value="period.id">
									{{ period.name }}
								</option>
							</select>
						</div>
						<!-- TODO: Make this modal base instead -->
						<button v-if="!availabilityLoading && !availabilities.length" class="btn-primary" @click="onCreateAvailability">
							Create Availability
						</button>
					</div>
					<div class="relative field">
						<label for="duration">Duration</label>
						<div class="relative w-full">
							<input id="duration" v-model="createBookingTypeForm.duration.value" placeholder="Enter how long this offering would take" type="number" class="input-field" required>
							<ColorBadge name="Minutes" class="absolute top-3 right-4" />
						</div>
					</div>
				</div>
			</div>
		</section>
		<aside class="flex flex-col md:w-1/2 w-full gap-5">
			<section class="flex flex-col">
				<div class="flex flex-col gap-6 px-4 py-6 border rounded-md border-dark">
					<div class="relative field">
						<label for="price">Price</label>
						<input id="price" v-model="createBookingTypeForm.price.value" placeholder="Enter  Price" type="number" class="input-field" required>
					</div>

					<div class="relative field">
						<label>Public</label>
						<select v-model="createBookingTypeForm.public.value" class="input-field">
							<option value="true">
								Yes
							</option>
							<option value="false">
								No
							</option>
						</select>
					</div>
				</div>
			</section>
		</aside>
	</section>
	<Skeleton v-else height="300px" />
</template>

<script setup lang="ts">

import { useCreateBookingType } from '@/composables/dashboard/bookingTypes/create'
import { useUser } from '@/composables/auth/user'
import { useFetchAvailabilities } from '@/composables/dashboard/availability/fetch'
import ColorBadge from '@/components/core/ColorBadge.vue'




defineProps({
	edit: {
		type: Boolean,
		required: true
	},
	loading: {
		type: Boolean,
		default: false
	}
})


const onCreateAvailability = () => {
	useUser().redirectUrl.value = '/business/offerings/create'
	useRouter().push('/business/availability/create')
}



const { availabilities, fetchAvailabilities, loading: availabilityLoading } = useFetchAvailabilities()

const { createBookingTypeForm, seletecAvailability } = useCreateBookingType()

fetchAvailabilities()


watch([createBookingTypeForm.availability_id, availabilities], (val) => {
	if (val[0] && availabilities.value.length) {
		seletecAvailability.value = availabilities.value.find((period) => period.id === val[0])
	}
}, { immediate: true, deep: true })

</script>

<style scoped>

</style>
