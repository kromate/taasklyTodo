<template>
	<section>
		<section class="center flex-col  gap-4">
			<Users :size="80" />
			<h1 class="text-xl font-bold mt-3">
				Find an Accountability Partner
			</h1>
			<p>
				Click the button below to copy the invite link and send it to a friend to become your accountability partner
			</p>
			<button class="btn-primary">
				Copy Invite Link
			</button>
		</section>
	</section>
</template>

<script setup>
import { Users } from 'lucide-vue-next'
</script>

<style lang="scss" scoped></style>
