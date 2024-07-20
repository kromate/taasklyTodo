<template>
	<form @submit.prevent="sendMoney">
		<div class="auth-form">
			<div class="field">
				<label class="more">Bank Name</label>
				<SuggestionInput v-model="credentials.bank.value" :options="banks" placeholder="Select a bank" :loading="bankingLoading" />
			</div>
			<div class="field relative">
				<label class="more">Account Number</label>
				<input v-model="credentials.accountNumber.value" class="input-field" type="text" placeholder="Enter an account number" required :disabled="resolveLoading">
			</div>
			<div class="field relative">
				<label class="more">Account Name </label>
				<input v-model="credentials.accountName.value" :placeholder="resolveLoading ? 'Loading...' : 'Enter an account name'" class="input-field" type="text" required disabled>
				<Spinner v-if="resolveLoading" class="!border-t-dark !border-[#0c030366] absolute right-4 top-9" />
			</div>
			<div class="field relative">
				<label class="more">Amount to send </label>
				<input v-model="credentials.amount.value" placeholder="#0.00" class="input-field" type="number" required>
			</div>
		</div>

		<div class="flex items-center gap-10  w-full mt-6">
			<button class="modal-btn" :disabled="loading || disabled" type="submit">
				<span v-if="!loading">Continue</span>
				<Spinner v-else />
			</button>
		</div>
	</form>
</template>

<script setup lang="ts">
import { useSendMoney, useFetchBanks } from '@/composables/dashboard/wallet/bankTansfer'


const { loading, credentials, sendMoney, resolveLoading, disabled } = useSendMoney()

const { banks, fetchBanks, loading: bankingLoading } = useFetchBanks()
fetchBanks()
</script>

<style scoped></style>
