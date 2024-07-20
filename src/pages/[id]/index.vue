<template>
	<div class="mx-auto max-w-3xl w-full px-4 py-24">
		<div class="flex flex-col items-center gap-4 mb-8 text-center">
			<img :alt="data.name" class="aspect-square rounded-full w-24 h-24 min-w-24 min-h-24 border border-line" :src="data.photo_url ?? '/filler.svg'">


			<h1 class="font-semibold text-3xl">
				{{ data.name }}
			</h1>
			<div class="text-sm md:text-base">
				<p>{{ data.bio }}</p>
			</div>
		</div>

		<section class="flex flex-col gap-4">
			<div v-for="booking in data.bookingTypes" :key="booking.id" class="flex border border-line rounded-md hover:btn_shadow">
				<div class="block w-full p-5">
					<nuxt-link :to="`/${username}/${booking.id}`">
						<div class="flex flex-wrap items-center">
							<h2 class="text-default pr-2 text-sm font-semibold">
								{{ booking.name }}
							</h2>
						</div>
						<div class="text-subtle">
							<div class="text-subtle break-words py-1 text-sm sm:max-w-[650px] [&_a]:text-blue-500 [&_a]:underline [&_a]:hover:text-blue-600 line-clamp-4 [&_*:not(:first-child)]:hidden">
								<p>{{ booking.desc }}</p>
							</div>
							<ul class="mt-2 flex flex-wrap gap-x-2 gap-y-1">
								<li>
									<div class="flex items-center gap-1 text-xs bg-subtle text-emphasis py-1 px-1.5 rounded bg-hover ">
										<Clock :size="16" />
										{{ booking.duration }}m
									</div>
								</li>
								<li>
									<div class="flex items-center gap-1 text-xs bg-subtle text-emphasis py-1 px-1.5 rounded bg-hover ">
										<Banknote :size="16" />
										{{ booking.price ? convertToCurrency(booking.price) : 'Free' }}
									</div>
								</li>
							</ul>
						</div>
					</nuxt-link>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import { Clock, Banknote } from 'lucide-vue-next'
import { useAPI } from '@/api_factory'
import { useCustomHead } from '@/composables/core/head'
import { convertToCurrency } from '@/composables/utils/currency'
import { UserWithBookings } from '@/composables/types'



const username = useRoute().params.id


	const { data, error } = await useAPI('/getUserPublicProfile', {
			method: 'POST',
			body: { username }
	}) as { data: Ref<UserWithBookings>, error: any }

useCustomHead({
	title: `${data.value.name} | Taaskly`,
	desc: data.value.bio || `Book a session with ${data.value.name}`,
	img: data.value.photo_url || '/lt.svg'
})
definePageMeta({
	layout: 'public'
})
</script>

<style scoped>

</style>
