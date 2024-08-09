<template>
    <main class="p-4 grid md:grid-cols-2 gap-4">
        <article class="flex flex-col gap-3 items-start p-4 border border-line rounded-md">
            <h4 class="!border-dark bg-hover card_ans text-sm md:text-base">
                I aim to increase my happiness levels by practicing gratitude daily for the next 3 months by writing down 3 things I am grateful for each morning and spending quality time with loved ones at least once a week.
            </h4>
            <span class="items-start pill">2 steps</span>
        </article>
    </main>
</template>

<script setup lang="ts">
import { usePageHeader } from '@/composables/utils/header'

definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated', () => {
        usePageHeader().setPageHeader({
            title: 'Create Goal',
            description: 'Create a new goal here',
            btnText: '',
            btnCall: () => useRouter().push('/booking-types/create'),
            shouldShowFab: true,
            shouldShowTab: usePageHeader().isLargeScreen.value

        })
    }]
})
</script>

<style scoped></style>
