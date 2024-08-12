<template>
	<div>
		Coming soon
	</div>
</template>

<script setup lang="ts">
import { usePageHeader } from '@/composables/utils/header'


definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated', () => {
		usePageHeader().setPageHeader({
			title: 'Todos',
			description: 'Manage your todos here',
			shouldShowFab: false,
			shouldShowTab: false
		})
	}]
})
</script>

<style scoped>

</style>
