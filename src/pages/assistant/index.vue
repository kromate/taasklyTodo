<template>
	<div>
		Coming Soon
	</div>
</template>

<script setup lang="ts">
import { usePageHeader } from '@/composables/utils/header'
import { useSmartGoal } from '@/composables/genericGoals/smart'


definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated', () => {
        usePageHeader().setPageHeader({
            title: 'Assistant',
            description: 'Your personal goal assistant',
            btnText: '',
            btnCall: () => useRouter().push('/booking-types/create'),
            shouldShowFab: false,
            shouldShowTab: false

        })
    }]
})
</script>

<style scoped>

</style>
