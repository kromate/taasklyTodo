<template>
	<div :class="['column-card border ', priorityClass]">
		<h3 class="column-card-title">
			{{ task.title }}
		</h3>
		<p class="column-card-desc">
			{{ task.description }}
		</p>
		<span class="column-card-badge">
			{{ task.priority }}
		</span>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

const priorityClass = computed(() => {
  switch (props.task.priority) {
    case 'high':
      return 'bg-red-100'
    case 'medium':
      return 'bg-yellow-100'
    case 'low':
      return 'bg-green-100'
    default:
      return 'bg-gray-100'
  }
})
</script>

<style scoped>
.column-card {
  @apply p-4 rounded-lg shadow-sm;

}

.column-card-title {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.column-card-desc {
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
}

.column-card-badge {
  font-size: 0.75rem;
  font-weight: bold;
  text-transform: uppercase;
}

.column-card-icon,
.column-card-icon-del {
  float: right;
  cursor: pointer;
  margin-left: 0.5rem;
}
</style>
