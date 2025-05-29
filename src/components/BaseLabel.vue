<template>
  <label :for="forId" class="block text-sm font-medium text-gray-700">
    {{ text }}
  </label>
</template>

<script setup>
defineProps({
  forId: String,
  text: String
})
</script>
