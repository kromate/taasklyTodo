<template>
	<main v-if="!IntegrationListLoading" class="w-full">
		<section class="p-4 grid md:grid-cols-2  xl:grid-cols-3 gap-4 w-full">
			<article class="flex flex-wrap border border-line rounded-md  p-4 gap-4 items-center">
				<GoogleIcon class="w-10 h-10" />
				<div class="flex flex-col gap-2">
					<h1 class="font-medium">
						Google Calendar
					</h1>
					<span v-if="hasGoogleCal.status" class="text-sm link">
						{{ hasGoogleCal.email }}
					</span>
				</div>


				<button class="btn-sm ml-auto" :disabled="linkGoogleCalLoading || hasGoogleCal.status" @click="link">
					<Spinner v-if="linkGoogleCalLoading" />

					<span v-else>
						{{ hasGoogleCal.status ? 'Connected' : 'Connect' }}
					</span>
				</button>
			</article>
		</section>
	</main>

	<Skeleton v-if="IntegrationListLoading" height="70vh" />
</template>

<script setup lang="ts">

import GoogleIcon from '@/assets/icons/Google.vue'

import { useFetchIntegrations } from '@/composables/dashboard/integrations/fetch'
import { usePageHeader } from '@/composables/utils/header'
import { useLinkGoogleCalendar } from '@/composables/dashboard/integrations/link'


const { fetchUserIntegrations, loading: IntegrationListLoading, fetchedIntegrations, hasIntegration } = useFetchIntegrations()

const { link, loading: linkGoogleCalLoading, integrationKeys } = useLinkGoogleCalendar()



const hasGoogleCal = computed(() => {
	if (hasIntegration(integrationKeys.google_calendar).value) {
		const data = fetchedIntegrations.value.filter((integration) => integration.id === integrationKeys.google_calendar)
		return {
			status: true,
			...data[0]
		}
	} else {
		return {
			status: false
		}
	}
})

fetchUserIntegrations()



definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated', () => {
		usePageHeader().setPageHeader({
			title: 'Integrations',
			description: 'Connect your account with other services',

			shouldShowFab: false,
			shouldShowTab: false

		})
	}]
})
</script>

<style scoped></style>
