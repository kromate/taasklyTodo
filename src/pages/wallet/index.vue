<template>
	<main class="p-4">
		<section v-if="!loading" class="mt-8 border-2 border-dark p-5 rounded-md w-full">
			<h1 class="page-title text-base md:text-lg">
				Available Balance
			</h1>

			<h2 v-if="wallet_data || wallet_data===null" class="md:text-5xl text-3xl font-bold text-dark">
				<span>{{ wallet_data?.balance ? convertToCurrency(wallet_data.balance) : convertToCurrency(0.00) }}</span>
			</h2>

			<div class="w-full mt-9">
				<button class="modal-btn mt-0" @click="useWalletModal().openSendMoney()">
					Withdrawal Money
				</button>
			</div>
		</section>
		<Skeleton v-else radius="6px" height="220px" width="100%" class="mt-8" />
	</main>
</template>

<script setup lang="ts">
import { useWalletModal } from '@/composables/core/modals'
import { usePageHeader } from '@/composables/utils/header'
import { convertToCurrency } from '@/composables/utils/currency'
import { useFetchWalletBalance } from '@/composables/dashboard/wallet/fetch'




const { fetch, loading, wallet_data } = useFetchWalletBalance()
onMounted(async () => {
	await fetch()
})

definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated', () => {
usePageHeader().setPageHeader({
	title: 'Wallet',
	description: 'Manage your wallet balance here',

	shouldShowFab: false,
	shouldShowTab: false

})
	}]
})
</script>

<style scoped>

</style>
