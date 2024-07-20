<template>
	<div class="auth-form">
		<div class="field relative">
			<label class="more">Amount debited</label>
			<p>{{ credentials.amount.value }}</p>
		</div>
		<div class="field relative">
			<label class="more">Payment Gateway fee</label>
			<p>{{ convertToCurrency(calculateTransferFee(credentials.amount.value)) }}</p>
		</div>
		<div class="field relative">
			<label class="more">Amount you will receive</label>
			<p>{{ convertToCurrency(credentials.amount.value-calculateTransferFee(credentials.amount.value)) }}</p>
		</div>

		<div class="flex items-center gap-10  w-full mt-6">
			<button class="modal-btn" @click="step--">
				Back
			</button>

			<button class="modal-btn " :disabled="loading" @click="sendMoney">
				<span v-if="!loading"> Send</span>
				<Spinner v-else class="!border-t-dark !border-[#0c030366]" />
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { convertToCurrency, calculateTransferFee } from '@/composables/utils/currency'
import { useSendMoney } from '@/composables/dashboard/wallet/bankTansfer'



const { credentials, step, loading, sendMoney } = useSendMoney()
</script>

<style scoped>

</style>
