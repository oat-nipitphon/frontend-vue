<script setup>
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";
import RegisterLoginModal from "@/components/auth/RegisterLoginModal.vue";
</script>
<template>
  <section class="bg-white lg:grid lg:h-screen mt-10">
    <div
      class="mx-auto w-screen max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32"
    >
      <div class="mx-auto max-w-prose text-center">
        <h1 class="text-4xl font-bold text-gray-900 sm:text-5xl">
          <p class="mb-5">Laravel Vue</p>
          <strong class="text-indigo-600">Tailwind</strong>
        </h1>

        <p class="mt-10 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
          By.Oat Nipitphon
        </p>
      </div>
      <div class="mt-10 mx-auto max-w-prose text-center">
        <RegisterLoginModal />
      </div>
    </div>

  </section>

</template>
