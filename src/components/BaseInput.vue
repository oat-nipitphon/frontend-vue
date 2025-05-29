<template>
  <div>
    <label
      :for="id"
      class="block mb-2 text-sm font-medium text-gray-900"
    >
      {{ label }}
    </label>
    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
       @blur="$emit('blur', $event)"
      class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg 
         focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
    />
  </div>
</template>

<script setup>
defineProps({
  id: { type: String, required: true },
  label: { type: String, default: '' },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  modelValue: [String, Number],
})

defineEmits(['update:modelValue', 'blur'])
</script>
