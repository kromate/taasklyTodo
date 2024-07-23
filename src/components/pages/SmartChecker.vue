<template>
	<transition name="glide_up" appear>
		<section v-if="isComponentOpen" class="h-screen w-screen bg-white absolute p-8 border border-dark flex flex-col gap-4">
			<button class="btn-sm bg-dark text-light rounded-full absolute top-4 right-4 gap-2 text-xl" @click="isComponentOpen = false">
				<CircleX :size="18" />
				Close
			</button>
			<div class="flex gap-4 items-center justify-center flex-wrap mt-16">
				<h1 class="outline text-4xl text-center sm:text-left font-black sm:text-5xl md:text-4xl lg:text-6xl xl:text-7xl tracking-normal text-dark poppins w-full center">
					Checking if your goal is S.M.A.R.T?
				</h1>
			</div>


			<ul class="list-image-none list-inside flex gap-3  flex-wrap justify-center text-lg md:text-2xl mb-12">
				<li>Specific</li>
				<li>Measurable</li>
				<li>Achievable</li>
				<li>Relevant</li>
				<li>Time-bound</li>
			</ul>

			<article class="border border-grey_four mx-auto p-4 px-8 shadow-md rounded-lg text-lg md:text-xl text-center">
				<span class="font-bold">Goal:</span>
				{{ userGoal }}
			</article>
			<article v-if="gemini_response && !loading" class="border border-grey_four mx-auto p-4 px-8 shadow-md rounded-lg text-lg md:text-xl text-center">
				<span class="font-bold">AI Response:</span>
				{{ gemini_response }}
			</article>

			<div v-if="loading" class="flex">
				<Skeleton radius="12px" height="280px" width="700px" class=" mx-auto" />
			</div>
		</section>
	</transition>
</template>

<script setup lang="ts">
import { CircleX } from 'lucide-vue-next'

import { useSmartGoal } from '@/composables/goals/smart'


const { isComponentOpen, loading, userGoal, gemini_response } = useSmartGoal()


</script>

<style scoped>
.outline {
	line-height: 1.2;
	text-decoration: none;
	color: transparent;
	-webkit-text-stroke: 1.5px #000;
}

li::first-letter {
  font-size: 1.25em;  /* Adjust font size as desired */
  font-weight: bold;
  color: #845bd8

}
</style>
