<!-- components/ImageUploader.vue -->
<template>
  <div class="col-span-full">
    <!-- สำหรับ cover photo -->
    <div
      class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
    >
      <div class="text-center">
        <img
          v-if="previewUrl"
          :src="previewUrl"
          class="mx-auto mb-4 h-32 object-cover rounded-md"
          alt="Preview"
        />
        <svg
          v-else
          class="mx-auto size-12 text-gray-300"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
            clip-rule="evenodd"
          />
        </svg>
        <div class="mt-4 flex text-sm/6 text-gray-600 justify-center">
          <label
            :for="inputId"
            class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 hover:text-indigo-500"
          >
            <span>File Image Upload</span>
          </label>
          <p class="pl-1">or drag and drop</p>
        </div>
        <p class="text-xs/5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
      </div>
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
  label: String,
  mode: {
    type: String,
    default: "avatar", // หรือ 'cover'
  },
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
