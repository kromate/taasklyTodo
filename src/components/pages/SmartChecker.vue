<template>
	<transition name="glide_up" appear>
		<section v-if="isComponentOpen" class="min-h-screen w-screen bg-white absolute md:p-8 p-4  flex flex-col items-center gap-4 pb-20 md:pb-32">
			<button class="btn-sm bg-dark text-light rounded-full fixed top-4 right-4 gap-2 text-xl" @click="isComponentOpen = false">
				<CircleX :size="18" />
				Close
			</button>
			<div class="flex gap-4 items-center justify-center flex-wrap mt-16">
				<h1 class="outline text-4xl text-center font-black sm:text-5xl md:text-4xl lg:text-6xl xl:text-7xl tracking-normal text-dark poppins w-full center">
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


			<transition name="show" appear>
				<div v-if="!loading && gemini_response?.has_error" class="flex flex-col gap-4 max-w-[560px] bg-[#f8c2c2] w-full border border-red mx-auto p-4 px-4 shadow-md rounded-lg  text-center">
					<p class="text-base">
						{{ gemini_response?.error_msg }}
					</p>
				</div>
			</transition>
			<transition name="show" appear>
				<div v-if="userGoal && !loading && !hasUserGoalChanged" class="flex flex-col gap-4 max-w-[560px] w-full border border-line mx-auto p-4 px-4 shadow-md rounded-lg">
					<div class="field">
						<label for="email">Your Goal:</label>
						<span class="card_ans">{{ userGoal }}</span>
						<div class="flex flex-wrap gap-2.5 text-xs mt-2 items-center justify-start">
							<span class="card_ans_sm"><b>Specific:</b>  {{ gemini_response?.is_specific }} </span>
							<span class="card_ans_sm"><b>Measurable:</b>  {{ gemini_response?.is_measurable }} </span>
							<span class="card_ans_sm"><b>Achievable:</b>  {{ gemini_response?.is_achievable }} </span>
							<span class="card_ans_sm"><b>Relevant:</b>  {{ gemini_response?.is_relevant }} </span>
							<span class="card_ans_sm"><b>Time-bound:</b>  {{ gemini_response?.is_time_bound }} </span>
						</div>
					</div>
					<transition name="glide_up" appear>
						<section v-if="gemini_response?.percentage" class="flex flex-col gap-4">
							<div class="field">
								<label for="email">How SMART is your Goal:</label>
								<span class="card_ans">{{ smartPercentage }}%</span>
							</div>
							<div v-if="gemini_response && gemini_response!.percentage < 85" class="field">
								<label for="email" class="flex justify-between w-full ">Refined Goal: <button class="btn-primary border border-dark rounded-full px-3.5 py-0.5" @click="userGoal = gemini_response?.adjusted_goal">Copy</button></label>
								<span class="card_ans">{{ gemini_response?.adjusted_goal }}</span>
							</div>

							<div class="card_ans !border-greenx bg-[#b8e3b8]">
								You need at least 85% smart gaol in order to generate a timeline
							</div>
						</section>
					</transition>
				</div>
			</transition>



			<div v-if="loading" class="flex px-4 w-full">
				<Skeleton radius="12px" height="280px" width="700px" class=" mx-auto px-4 max-w-[90%]" />
			</div>
			<div class="fixed bottom-2.5 inset-x-0 bg-white pt-2.5 px-3 center">
				<form v-if="gemini_response && gemini_response!.percentage < 85" class=" relative  w-full md:max-w-[560px] flex flex-wrap mt-auto" @submit.prevent="checkIfGoalIsSmart">
					<input v-model="userGoal" type="text" class="input-field rounded-full !py-7 pr-36 " placeholder="Enter your goal (e.g., Learn a new language)">

					<button class="btn-sm bg-dark text-light rounded-full absolute top-2.5 right-4" type="submit" :disabled="!userGoal || loading">
						Generate
					</button>
				</form>
				<form v-else class=" relative  w-full md:max-w-[560px] flex flex-wrap mt-auto" @submit.prevent="checkIfGoalIsSmart" />
			</div>
		</section>
	</transition>
</template>

<script setup lang="ts">
import { CircleX } from 'lucide-vue-next'

import { useSmartGoal } from '@/composables/goals/smart'


const { isComponentOpen, loading, userGoal, gemini_response, checkIfGoalIsSmart, hasUserGoalChanged, smartPercentage } = useSmartGoal()


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

.card_ans{
@apply p-2 border border-line w-full rounded-md
}
.card_ans_sm{
@apply px-2 py-1.5 border border-line w-auto rounded-md
}

.show-enter-active {
  transition: all 0.3s ease-out;
}

.show-enter-from {
  opacity: 0;
  transform: scale(0.5);
}

.show-leave-active {
  transition: all 0.3s ease-in;
}

.show-leave-to {
  opacity: 0;
  transform: scale(0.5);
}
</style>
