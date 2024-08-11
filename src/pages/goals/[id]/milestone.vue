<template>
	<div>
		Milestone
		{{ goalDetails.started }}
	</div>
</template>

<script setup>
import { useFetchGoalsById } from '@/composables/dashboard/goals/id'

const { goalDetails } = useFetchGoalsById()
</script>

<style lang="scss" scoped></style>
