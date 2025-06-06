<template>
  <!-- Import Grid Layout Header -->

  <div class="bg-white shadow-sm">
    <div class="bg-white py-10 sm:py-10">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <PageHeader title="HomeView" />
        <div class="flex justify-end bg-white shadow-lg rounded-lg p-5">
          <RouterLink
            class="inline-block rounded-sm bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:ring-3 focus:outline-hidden"
            :to="{ name: 'CreatePostView' }"
          >
            Create Post
          </RouterLink>
        </div>
        <div
          class="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3"
          v-if="storePosts"
        >
          <article
            v-for="(post, index) in storePosts"
            :key="index"
            class="flex max-w-xl flex-col items-start justify-between"
          >
            <div class="flex items-center gap-x-4 text-xs">
              <time :datetime="post?.created_at" class="text-gray-500">{{
                post?.created_at
              }}</time>
              <a
                :href="post?.refer"
                class="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                >{{ post?.title }}</a
              >
            </div>
            <div class="group relative">
              <h3
                class="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600"
              >
                <a :href="post?.refer">
                  <span class="absolute inset-0" />
                  {{ post?.title }}
                </a>
              </h3>
              <p class="mt-5 line-clamp-3 text-sm/6 text-gray-600">
                {{ post?.content }}
              </p>
            </div>
            <div class="relative mt-8 flex items-center gap-x-4">
              <p v-for="(image, index) in post.post_images" :key="index">
                <img  :src="'data:image/png;base64,' + image.image_data" alt="" class="size-10 rounded-full bg-gray-50 m-auto">
                {{ image.image_data }}
                <!-- <img src="../assets/images/keyboard.jpg" alt="" class="size-10 rounded-full bg-gray-50 m-auto"> -->
              </p>
              <div class="text-sm/6">
                <p class="font-semibold text-gray-900">
                  <a :href="post?.refer">
                    <span class="absolute inset-0" />
                    {{ post?.user_profiles?.users?.username }}
                  </a>
                </p>
                <p class="text-gray-600">
                  {{ post?.user_profiles?.users?.user_status.user_status_name }}
                </p>
              </div>
            </div>
          </article>
        </div>
        <div v-else class="m-auto p-3 bg-red-500 flex justify-center">
          <p class="text-3xl font-blod text-white">Post require false !!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";
import { usePostStore } from "@/stores/post";
import PageHeader from "@/components/PageHeader.vue";

const authStore = useAuthStore();
const { users } = storeToRefs(authStore);

const postStore = usePostStore();
const { storePosts } = storeToRefs(postStore);
const { storeUpdatePost } = usePostStore();

onMounted(async () => {
  await postStore.storeGetPosts();
  console.log("home view posts store ", storePosts.value);
});
</script>
