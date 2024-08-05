<template>
	<div>
		goals
	</div>
</template>

<script setup lang="ts">
import { usePageHeader } from '@/composables/utils/header'

definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated', () => {
		usePageHeader().setPageHeader({
			title: 'Goals',
			description: 'Manage your goals here',
			btnText: 'Create New Goal',
			btnCall: () => useRouter().push('/booking-types/create'),
			shouldShowFab: true,
			shouldShowTab: usePageHeader().isLargeScreen.value

		})
	}]
})
</script>

<style scoped>

</style>
