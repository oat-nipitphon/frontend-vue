<script setup>
import { reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia';
import { usePostStore } from '@/stores/post';

const route = useRoute();

const { storeGetPostShow, storeUpdatePost } = usePostStore()
const postEdit = ref([]);
const form = reactive({
    id: '',
    title: '',
    content: '',

});

onMounted(async () => {
 postEdit.value = await storeGetPostShow(route.params.id);
 console.log('edit post view ', postEdit.value);
});
</script>
<template>
    <div class="bg-red-500">
        {{ postEdit }}
    </div>
</template>