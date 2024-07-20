<template>
	<div class=" min-h-screen w-full bg-grey">
		<section class="flex flex-col w-full">
			<slot />
		</section>


		<ModalBase />
		<Alert />
	</div>
</template>

<script setup lang="ts">




</script>

<style scoped></style>
