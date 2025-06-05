<!-- components/ImageUploader.vue -->
<template>
  <div class="col-span-full">
    <!-- สำหรับ photo แบบ avatar -->
    <div class="mt-2 flex items-center gap-x-3">
      <img
        v-if="previewUrl"
        :src="previewUrl"
        class="size-12 rounded-full object-cover border"
        alt="Preview"
      />
      <svg
        v-else
        class="size-12 text-gray-300"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
          clip-rule="evenodd"
        />
      </svg>
      <button
        type="button"
        class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
        @click="selectFile"
      >
        Image File Upload
      </button>
    </div>

    <!-- hidden file input -->
    <input
      :id="inputId"
      ref="fileInput"
      type="file"
      accept="image/*"
      class="sr-only"
      @change="handleFileChange"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  inputId: {
    type: String,
    default: "file-upload",
  },
});

const emit = defineEmits(["update:file"]);

const previewUrl = ref(null);
const fileInput = ref(null);

function handleFileChange(event) {
  const file = event.target.files[0];
  if (file && file.type.startsWith("image/")) {
    previewUrl.value = URL.createObjectURL(file);
    emit("update:file", file);
  }
}

function selectFile() {
  fileInput.value.click();
}
</script>
