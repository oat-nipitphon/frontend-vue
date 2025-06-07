<script setup>
import { ref, onMounted, computed } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";
import { usePostStore } from "@/stores/post";
import PageHeader from "@/components/PageHeader.vue";

const router = useRouter();

const authStore = useAuthStore();
const { users } = storeToRefs(authStore);

const postStore = usePostStore();
const { storePosts } = storeToRefs(postStore);
const { storeUpdatePost, storeDeletePost } = usePostStore();

const showDropdown = ref(false);

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const onStorePost = (postID) => {
  console.log("store post ", postID);
};

const onEditPost = (postID) => {
  console.log('function on edit post ', postID);
  router.push({
    name: 'EditPostView',
    params: {
      id: postID
    }
  });
};


// Computed Report post map
// const enrichedPosts = computed(() =>
//   posts.value.map(post => {
//     const likeCount = post.postPopularity.filter(
//       pop => pop.status === 'Like'
//     ).length
//     const disLikeCount = post.postPopularity.filter(
//       pop => pop.status === 'DisLike'
//     ).length
//     const userLiked = post.postPopularity.some(
//       pop => pop.userID === userID.value && pop.status === 'Like'
//     )
//     const userDisliked = post.postPopularity.some(
//       pop => pop.userID === userID.value && pop.status === 'DisLike'
//     )
//     return {
//       ...post,
//       likeCount,
//       disLikeCount,
//       userLiked,
//       userDisliked,
//     }
//   })
// )

// FormatDateTime
const formatDateTime = (dateTime) => {
  if (!dateTime) return "-";

  const date = new Date(dateTime);

  const year = date.getFullYear() + 543; // แปลงเป็น พ.ศ.
  const month = date.getMonth(); // 0-11
  const day = date.getDate();

  const hour = date.getHours().toString().padStart(2, "0");
  const minute = date.getMinutes().toString().padStart(2, "0");
  const second = date.getSeconds().toString().padStart(2, "0");

  const thaiMonths = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ];

  return `${day} ${thaiMonths[month]} ${year} เวลา ${hour}:${minute}:${second} น.`;
};

onMounted(async () => {
  await postStore.storeGetPosts();
});
</script>
<template>
  <div class="shadow-sm">
    <div class="py-10 sm:py-10">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <PageHeader title="HomeView" />
        <div class="flex justify-end shadow-lg rounded-lg p-5">
          <RouterLink
            class="inline-block rounded-sm bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:ring-3 focus:outline-hidden"
            :to="{ name: 'CreatePostView' }"
          >
            Create Post
          </RouterLink>
        </div>
        <div
          class="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-2"
          v-if="storePosts"
        >
          <article
            v-for="(post, index) in storePosts"
            :key="index"
            class="flex max-w-xl flex-col items-start justify-between bg-white shadow-lg rounded-b-lg p-5"
          >
            <div class="w-full bg-red-500 p-2">
              <div class="grid grid-cols-2">
                <div class="bg-gray-500">1</div>
                <div class="bg-green-500">2</div>
              </div>
            </div>
            <div class="grid grid-cols-2">
              <div class="flex items-center gap-x-4 text-xs">
                <time :datetime="post?.created_at" class="text-gray-500">{{
                  formatDateTime(post?.created_at)
                }}</time>
                <a
                  :href="post?.refer"
                  class="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                  >{{ post?.title }}</a
                >
              </div>
              <!-- Menu button dropdown event -->
              <div class="flex justify-end p-5">
                <div class="dropdown mr-5 mt-3">
                  <img
                    class="size-6 mr-5 mt-3"
                    src="../assets/icon/sliders.svg"
                    alt="SettingPost"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  />
                  <ul class="dropdown-menu">
                    <li>
                      <button
                        class="dropdown-item"
                        type="submit"
                        @click="onStorePost(post.id)"
                      >
                        <label
                          for="Event-Store"
                          class="text-sm ml-2 text-gray-900"
                        >
                          Store
                        </label>
                      </button>
                    </li>
                    <li>
                      <button
                        class="dropdown-item"
                        type="submit"
                        @click="onEditPost(post.id)"
                      >
                        <label
                          for="Event-Store"
                          class="text-sm ml-2 text-gray-900"
                        >
                          Edit
                        </label>
                      </button>
                    </li>
                    <li>
                      <button
                        class="dropdown-item"
                        type="submit"
                        @click="storeDeletePost(post.id)"
                      >
                        <label
                          for="Event-Store"
                          class="text-sm ml-2 text-gray-900"
                        >
                          Delete
                        </label>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="flex justify-end bg-red-500">menu</div>
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
                <img
                  :src="'data:image/png;base64,' + image.image_data"
                  alt=""
                  class="ibox-image-post rounded-full bg-gray-50 m-auto"
                />
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
<style>
.ibox-image-post {
  width: 150px;
  height: 150px;
  margin: auto;
  padding: auto;
}
</style>
