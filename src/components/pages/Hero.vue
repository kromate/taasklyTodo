<template>
	<main class=" h-full container   md:py-24 py-10 overflow-hidden">
		<div class="md:max-w-7xl mx-auto w-full overflow-hidden max-w-screen">
			<div class="absolute -z-10 pointer-events-none inset-0 overflow-hidden">
				<div class="absolute -z-1 -top-[128%] sm:-top-[107%] xl:-top-[73%] left-1/2 -translate-x-1/2 -u-z-10 hero-circle-gradient w-full h-[1282px] rounded-full md:max-w-[1282px]" />
				<div class="absolute -z-1 -top-[112%] sm:-top-[93%] xl:-top-[62%] left-1/2 -translate-x-1/2 -u-z-10 hero-circle-gradient w-full h-[1046px] rounded-full md:max-w-[1046px]" />

				<div class="absolute top-0 left-1/2 -translate-x-1/2 -u-z-10">
					<img src="/blur-01.svg" alt="blur" class="max-w-none">
				</div>
			</div>
		</div>

		<div class="mx-auto max-w-[900px] px-4 sm:px-8 xl:px-0 relative z-1 overflow-hidden max-w-screen text-center flex flex-col gap-4 center w-full">
			<h1 class="text-dark mb-6 text-5xl font-extrabold sm:text-7xl max-w-[810px]">
				Achieve Your Goals with Personalized Actionable Steps
			</h1>
			<p class="max-w-[900px] mx-auto mb-9 font-medium md:text-lg">
				Our app provides you with a personalized list of actionable steps and to-dos to help you reach your goals efficiently. Say goodbye to feeling overwhelmed and hello to progress!
			</p>
			<div class=" relative  w-full md:max-w-[560px] flex flex-wrap">
				<input v-model="userGoal" type="text" class="input-field rounded-full !py-7 pr-36" placeholder="Enter your goal (e.g., Learn a new language)">

				<button class="btn-sm bg-dark text-light rounded-full absolute top-2.5 right-4" :disabled="!userGoal" @click="checkIfGoalIsSmart">
					Generate
				</button>
			</div>
		</div>
	</main>
</template>

<script lang='ts' setup>
import { useSmartGoal } from '@/composables/goals/smart'


const { checkIfGoalIsSmart, userGoal } = useSmartGoal()
</script>

<style scoped>
input::placeholder {
  @apply text-[#252525ea] font-semibold text-lg
}
</style>
