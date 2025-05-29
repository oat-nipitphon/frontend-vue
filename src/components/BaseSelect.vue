<template>
  <div>
    <label :for="id" class="block mb-2 text-sm font-medium text-gray-900">
      {{ label }}
    </label>
    <select :id="id" :value="modelValue" @change="$emit('update:modelValue', $event.target.value)"
      @blur="$emit('blur', $event)" class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg 
         focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
      <option value="">{{ placeholder }}</option>
      <option v-for="item in options" :key="item?.[optionKey]" :value="item?.[optionKey]">
        {{ item?.[optionLabel] }}
      </option>
      <slot></slot>
    </select>
  </div>
</template>

<script setup>
defineProps({
  id: { type: String, required: true },
  label: { type: String, default: '' },
  placeholder: { type: String, default: 'Select' },
  options: {
    type: Array,
    required: true,
    default: () => []
  },
  optionKey: {
    type: String,
    default: 'id'
  },
  optionLabel: {
    type: String,
    default: 'name'
  },
  modelValue: [String, Number, Boolean, null]
})

defineEmits(['update:modelValue', 'blur'])
</script>
