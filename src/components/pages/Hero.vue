<template>
	<main class=" h-full container grid lg:grid-cols-2 gap-12 items-center justify-start  md:py-32 py-10">
		<section class="md:text-start text-center px-4">
			<h1 class="md:text-7xl text-5xl font-extrabold mb-4 pathway leading-[1.2]">
				Booking Simplified
			</h1>
			<p class="md:text-2xl text-lg font-medium md:font-normal text-dark mb-8 ">
				Create personalized booking pages, manage appointments effortlessly, and get paid seamlessly. Tailored for African entrepreneurs, perfect for everyone.
			</p>
			<div class="flex gap-4 items-center w-full justify-center md:justify-start">
				<nuxt-link to="/booking-types" class="bg-black text-white md:py-4 py-3 md:px-6 px-8 rounded-md md:text-[17px]">
					Create a booking page
				</nuxt-link>
				<!-- <a class="md:text-xl font-semibold underline " href="https://www.youtube.com/watch?v=f3XQRsgvRTU&ab_channel=Kromate" target="_blank" rel="noopener noreferrer">Watch a Demo</a> -->
			</div>
		</section>

		<section class="flex center items-start relative h-full m-5 ">
			<img src="/hero.png" class="w-full absolute lg:-top-[160px] ">
		</section>
	</main>
</template>

<script lang='ts' setup>


</script>
