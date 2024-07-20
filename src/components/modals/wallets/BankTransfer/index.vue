<template>
	<Modal
		modal="$atts.modal"
		title="Bank Transfer"
	>
		<Step_one v-if="step === 1" />
		<Step_two v-if="step === 2" />
	</Modal>
</template>

<script setup lang="ts">
import Step_one from './step_one.vue'
import Step_two from './step_two.vue'
import { useSendMoney } from '@/composables/dashboard/wallet/bankTansfer'


const { step } = useSendMoney()
</script>

<style scoped></style>
