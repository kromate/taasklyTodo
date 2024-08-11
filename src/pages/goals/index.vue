<template>
	<main>
		<section v-if='!loading' class="p-4 grid md:grid-cols-2 gap-4">
			<nuxt-link class="flex flex-col gap-3 items-start p-4 border border-line rounded-md " :to='`/goals/${goal.id}`' v-for='goal in userGoals' :key='goal.id'>
				<h4 class="!border-dark bg-hover card_ans text-sm md:text-base h-full">
					{{ goal.goal }}
				</h4>

			</nuxt-link>
		</section>

		<section v-else>
			<Skeleton />
		</section>

		<section v-if="userGoals.length === 0 && !loading" class="center flex-col min-h-[70vh] gap-4">
			<Target :size="80" />
			<h1 class="text-xl font-bold mt-3">
				You currently have no Goals yet
			</h1>
			<p> Click the button below to create a goal </p>
			<nuxt-link to="/goals/create" class="btn-primary">
				Create
			</nuxt-link>
		</section>

	</main>
</template>

<script setup lang="ts">
import { Target } from 'lucide-vue-next'
import { usePageHeader } from '@/composables/utils/header'
import { useFetchUserGoals } from '@/composables/dashboard/goals/fetch';



const { fetchUserGoals, loading, userGoals } = useFetchUserGoals()

fetchUserGoals()

definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated', () => {
		usePageHeader().setPageHeader({
			title: 'Goals',
			description: 'Manage your goals here',
			btnText: 'Create New Goal',
			btnCall: () => useRouter().push('/goals/create'),
			shouldShowFab: true,
			shouldShowTab: usePageHeader().isLargeScreen.value

		})
	}]
})
</script>

<style scoped></style>
