<template>
	<div class="flex gap-2 items-center">
		<ComboBox v-model="selectedStartTime" :items="startTimeValues" :display-value="(data:any)=>data.name" /> -
		<ComboBox v-model="selectedEndTime" :items="endTimeValues" :display-value="(data:any)=>data.name" />
		<slot name="icon" />
	</div>
</template>

<script setup lang="ts">
import ComboBox from '@/components/core/ComboBox.vue'
import { timeSlotList } from '@/composables/helpers/timeSlotList'

const emit = defineEmits(['updated'])

const props = defineProps<{
    id: number | string;
    startTime: {name:string, value:string, index:number}
    endTime: {name:string, value:string, index:number}
}>()



// Reactive variables with default values
const selectedStartTime = ref(props.startTime || { name: '9:00am', value: '09:00', index: 36 })
const selectedEndTime = ref(props.endTime || { name: '5:00pm', value: '17:00', index: 68 })

const startTimeValues = computed(() => {
  const endIndex = timeSlotList.findIndex((slot) => slot.value === selectedEndTime.value.value)
  return timeSlotList.slice(0, endIndex).map((slot) => ({ name: slot.name, value: slot.value, index: slot.index }))
})

const endTimeValues = computed(() => {
  const startIndex = timeSlotList.findIndex((slot) => slot.value === selectedStartTime.value.value)
  return timeSlotList.slice(startIndex + 1).map((slot) => ({ name: slot.name, value: slot.value, index: slot.index }))
})

watch([selectedStartTime, selectedEndTime], (val) => {
    if (val) {
        emit('updated', { id: props.id, data: { startTime: val[0], endTime: val[1] } })
    }
})
</script>

<style scoped>
</style>
