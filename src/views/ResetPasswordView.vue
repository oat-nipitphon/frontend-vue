<template>
    <div class="flex justify-center mt-10 text center">
        <PageHeader title="Reset Password" />
        <div class="mt-5">
            <RouterLink 
            class="inline-block rounded-sm bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:ring-3 focus:outline-hidden"
            :to="{ name: 'IndexView' }" >Index</RouterLink>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import PageHeader from '@/components/PageHeader.vue';

</script>