<template>
	<div class=" min-h-screen">
		<section class="flex flex-col">
			<HeroNav />
			<slot />
		</section>


		<ModalBase />
		<Alert />
	</div>
</template>

<script setup lang="ts">
import HeroNav from '@/components/layouts/HeroNav.vue'

</script>

<style scoped></style>
