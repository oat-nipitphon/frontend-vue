<template>
  <div class="w-full m-auto p-5 rounded-lg">
    <Editor v-model="value" editorStyle="height: 320px" />
  </div>
</template>
<script setup>
// import Editor from 'primevue/editor';
import Editor from "quill/core/editor";
</script>
