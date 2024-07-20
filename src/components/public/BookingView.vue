<template>
	<section class="md:center md:h-screen w-screen ">
		<div v-if="!loading" class="max-w-full border md:min-h-[480px] w-full md:w-auto gap-6 md:gap-0  overflow-y-auto flex md:flex-row flex-col transite center !items-start border-b bg-white">
			<section class="flex flex-col gap-2 md:w-1/4 w-full   p-6 h-full md:min-w-[240px]" :class="[showSecondForm ? 'md:min-w-[340px]':'']">
				<nuxt-link :to="`/${data.username}`">
					<Avatar :size="28" :src="data.photo_url" :name="data.name" />
				</nuxt-link>


				<h3 class="text-base mt-1">
					{{ data.name }}
				</h3>
				<h1 class="text-xl font-medium -mt-2">
					{{ bookingType.name }}
				</h1>
				<p class="text-sm">
					{{ bookingType.desc }}
				</p>
				<div v-if="showSecondForm && credientials.selectedTime.value" class="rounded-md flex items-start  gap-2 text-sm mt-3 mb-2">
					<Calendar :size="16" class="mt-1" />
					<div class="flex flex-col">
						<span>{{ formatDateString(selectedDateString) }}</span>
						<span>{{ credientials.selectedTime.value[activeTab === '12h' ? 'name': 'value'] }} - {{ addDurationToTimeSlotObj(credientials.selectedTime.value, bookingType.duration)![activeTab === '12h' ? 'name': 'value'] }}</span>
					</div>
				</div>

				<div class="flex gap-4">
					<div class="flex items-center gap-1 text-xs bg-subtle text-emphasis py-1 px-1.5 rounded bg-hover ">
						<Clock :size="16" />
						{{ bookingType.duration }}m
					</div>
					<div class="flex items-center gap-1 text-xs bg-subtle text-emphasis py-1 px-1.5 rounded bg-hover ">
						<Banknote :size="16" />
						{{ bookingType.price ? convertToCurrency(bookingType.price) : 'Free' }}
					</div>
				</div>
			</section>

			<section v-if="!showSecondForm" class="md:w-1/2 lg:min-w-[500px] border-x w-full  md:h-[480px]">
				<RadixCalendar v-model="credientials.selectedDate.value" :loading="loadingState.date.value" :is-props-date-unavailable="isDateUnavailableFunction" />
			</section>

			<section v-if="!showSecondForm" class="md:w-1/4  pt-3 px-5 h-full w-full md:min-w-[240px]">
				<header class="flex w-full justify-between">
					<p class="text-sm">
						<span class="font-bold text-base">{{ formatDateString(selectedDateString, {weekday:'short'}) }}</span> {{ formatDateString(selectedDateString, {day:'2-digit'}) }}
					</p>
					<div class="grid grid-cols-2 border  h-9 p-1 w-[110px] rounded">
						<span
							v-for="tab in tabs"
							:key="tab"
							class="center tab_style"
							:class="{ active: activeTab === tab }"
							@click="setActiveTab(tab)"
						>{{ tab }}</span>
					</div>
				</header>

				<div class="flex flex-col gap-2 overflow-y-auto  mt-6 hide-scrollbar md:h-[400px] ">
					<Skeleton v-if="loadingState.time.value" radius="10px" />
					<div v-if="!loadingState.time.value && availableTimeSlotList?.length" class="flex flex-col gap-2">
						<span v-for="time in availableTimeSlotList" class="border center rounded-md py-2 text-sm cursor-pointer hover:border-dark transite" @click="credientials.selectedTime.value = time">{{ time[activeTab === '12h' ? 'name' : 'value'] }}</span>
					</div>
					<div v-if="!loadingState.time.value && !availableTimeSlotList?.length" class="flex flex-col center w-full text-center gap-5 ">
						<CalendarOff class="w-9 h-9" />
						<p class="text-xl">
							No Time Available. <br> select another
						</p>
					</div>
				</div>
			</section>

			<section v-if="showSecondForm" class="flex flex-col md:min-w-[420px] w-full p-4 border-l h-full">
				<form class="auth-form  w-full h-full" @submit.prevent="createBooking">
					<div class="field">
						<label for="email">Your name</label>
						<input
							id="email"
							v-model="credientials.contact.value.name"
							placeholder="Enter your full name"
							autocomplete="name"
							type="name"
							class="input-field"
							required
						>
					</div>
					<div class="field">
						<label for="email">Email Address</label>
						<input
							id="email"
							v-model="credientials.contact.value.email"
							placeholder="Enter a valid Email address"
							type="email"
							class="input-field"
							autocomplete="off"
							required
						>
					</div>
					<PhoneInput v-model="credientials.contact.value.phone" />
					<div class="field relative  border-dark ">
						<label>Additional Notes</label>
						<textarea v-model="credientials.notes.value" class="input-textarea px-4 mt-2" placeholder="Add instructions for the vendor" />
					</div>



					<footer class="flex w-full gap-4 justify-end p-4 pr-0 mt-auto">
						<button class="btn-secondary " type="button" @click="credientials.selectedTime.value=null">
							Go back
						</button>

						<button class="btn-primary hover:mr-2" type="submit" :disabled="loading">
							Create Booking
						</button>
					</footer>
				</form>
			</section>
		</div>
		<Skeleton v-else height="400px" width="800px" />
	</section>
</template>

<script setup lang="ts">
import { CalendarOff, Banknote, Clock, Calendar } from 'lucide-vue-next'
import { convertToCurrency } from '@/composables/utils/currency'
import { formatDateString } from '@/composables/utils/formatter'
import { useFetchPublicBookingTypeById } from '@/composables/dashboard/bookingTypes/id'
import { addDurationToTimeSlotObj } from '@/composables/public/utils'
import { useCreateBooking } from '@/composables/public/booking'
import { booking_create_utils } from '@/composables/public/create_utils'
import { useAPI } from '@/api_factory'
import { UserWithBookings } from '@/composables/types'




const tabs = ['12h', '24h']
const activeTab = ref('12h')
function setActiveTab(tab: string) {
  activeTab.value = tab
}




const showSecondForm = computed(() => {
	if (credientials.selectedDate.value && credientials.selectedTime.value) {
		return true
	} else {
		return false
	}
})
const { credientials, availableTimeSlotList, isDateUnavailableFunction, selectedDateString, loadingState } = booking_create_utils

const { createBooking, initBooking } = useCreateBooking()


const { fetchPublicBookingTypeById, bookingType, loading } = useFetchPublicBookingTypeById()


const bookingId = useRoute().params.slug as string
const publicUsername = useRoute().params.id as string



	const { data, error } = await useAPI('/getUserPublicProfile', {
			method: 'POST',
		body: { username: publicUsername }
	}) as { data: Ref<UserWithBookings>, error: any }


	watch(() => useRoute().params.slug, async (newId) => {
		await fetchPublicBookingTypeById(data.value.id!, bookingId)

		initBooking(bookingType.value)
	}, { immediate: true })



</script>

<style scoped lang='scss'>
.tab_style{
@apply  rounded  cursor-pointer;
&.active{
    @apply bg-dark text-white
}
}
</style>
