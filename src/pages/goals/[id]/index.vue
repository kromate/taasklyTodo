<template>
	<main class='p-4'>
		<article class="flex flex-col gap-3 items-start p-4 border border-line rounded-md">

			<h4 class="!border-dark bg-hover card_ans text-base md:text-xl">
				I aim to increase my happiness levels by practicing gratitude daily for the next 3 months by writing down 3 things I am grateful for each morning and spending quality time with loved ones at least once a week.
			</h4>
			<button class="btn w-full bg-dark text-light">Click to start this goal</button>
		</article>

		<div class="flex w-full  justify-start mt-10">
			<Tabs :selected="selected" :tabs="tabViews" @changed="updateTab($event)" />
		</div>
		<div class="mb-12">
			<keep-alive>
				<component :is="tabs[selected]" @changed="updateTab($event)" />
			</keep-alive>
		</div>
	</main>
</template>

<script setup lang="ts">
import { useTabs } from '@/composables/utils/tabs'
import { usePageHeader } from '@/composables/utils/header'
import actionable_step from '@/pages/goals/[id]/steps.vue'
import milestone from '@/pages/goals/[id]/milestone.vue'
import todo from '@/pages/goals/[id]/todo.vue'
import accountability_partner from '@/pages/goals/[id]/partner.vue'

// import { useSmartGoal } from '@/composables/genericGoals/smart'




const { initTabs, selected, tabViews, updateTab, tabs, onTabMounted } = useTabs()

initTabs(
	'actionable_step',
	['actionable_step', 'milestone', 'todo', 'accountability_partner'],
	markRaw({ actionable_step, milestone, todo, accountability_partner })
)

onTabMounted()

definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated', () => {
		usePageHeader().setPageHeader({
			title: 'View Goal',
			description: 'View your goal and details of the actionable steps you need to take to achieve it.',
			btnText: '',
			btnCall: () => useRouter().push('/booking-types/create'),
			shouldShowFab: false,
			shouldShowTab: false

		})
	}]
})
</script>

<style scoped></style>
