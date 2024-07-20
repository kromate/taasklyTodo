<template>
	<header class="container flex items-center justify-between py-8 md:px-5 px-4 bg-transparent flex-wrap">
		<nuxt-link to="/">
			<img src="/lt.svg" alt="logo" class=" md:w-auto w-32">
		</nuxt-link>

		<div class="flex items-center gap-5 order-3  md:order-2 mt-5 md:mt-0 mx-auto">
			<nuxt-link to="/privacy" class="underline">
				Privacy Policy
			</nuxt-link>
			<nuxt-link to="/terms" class="underline">
				Terms of Service
			</nuxt-link>
		</div>

		<nuxt-link v-if="!isLoggedIn" to="/auth/login" class="btn-primary">
			Login
		</nuxt-link>
		<nuxt-link v-else to="/auth/login" class="btn-primary">
			Dashboard
		</nuxt-link>
	</header>
</template>

<script setup lang="ts">
import { useUser } from '@/composables/auth/user'


const { isLoggedIn } = useUser()
</script>

<style scoped>
.btn-primary{
@apply text-sm px-5 py-3 md:text-base md:px-10 order-1 md:order-3 ml-12 md:ml-0
}
</style>
