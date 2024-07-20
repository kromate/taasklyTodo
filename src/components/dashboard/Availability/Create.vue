<template>
	<Skeleton v-if="loading" height="350px" />
	<section v-else class="flex flex-col gap-4">
		<div v-for="day in default_days_of_week_data" :key="day.value" class="flex flex-col md:flex-row gap-4 md:min-h-10 mt-4 items-start">
			<Switch v-model="day.active" :label="day.name" class="min-w-[130px] mt-2" />
			<div v-if="day.active" class="flex flex-col gap-2">
				<TimeSlot v-for="(time, index) in day.timeSlot" :id="`${day.value},${index}`" :key="time.startTime" :start-time="findTimeSlot(time.startTime)" :end-time="findTimeSlot(time.endTime)" @updated="onTimeslotUpdate">
					<template #icon>
						<PlusCircle v-if="index === 0" name="plus" class="w-4 cursor-pointer" @click="addTimeSlot(day.value)" />
						<Trash v-else name="delete" class="w-4 cursor-pointer" @click="removeTimeSlot(day.value, index)" />
					</template>
				</TimeSlot>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { PlusCircle, Trash } from 'lucide-vue-next'
import TimeSlot from './TimeSlot.vue'
import { findTimeSlot } from '@/composables/helpers/timeSlotList'
import { useCreateAvailability } from '@/composables/dashboard/availability/create'




const { default_days_of_week_data } = useCreateAvailability()

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




const onTimeslotUpdate = (updated_day) => {
    const [dayIndex, timeIndex] = updated_day.id.split(',').map(Number)
    default_days_of_week_data.value[dayIndex].timeSlot[timeIndex].startTime = updated_day.data.startTime.value
    default_days_of_week_data.value[dayIndex].timeSlot[timeIndex].endTime = updated_day.data.endTime.value
}

const addTimeSlot = (dayIndex) => {
    default_days_of_week_data.value[dayIndex].timeSlot.push({ startTime: '08:00', endTime: '17:00' })
}
const removeTimeSlot = (dayIndex, timeIndex) => {
    default_days_of_week_data.value[dayIndex].timeSlot.splice(timeIndex, 1)
}


</script>
