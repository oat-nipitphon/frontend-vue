import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from '@/stores/auth'

import IndexView from "@/views/IndexView.vue";
import HomeView from "@/views/HomeView.vue";

import CreatePostView from '@/views/post/CreatePostView.vue'
import EditPostView from "@/views/post/EditPostView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: "/:pathMatch(.*)*",
      component: () => import("@/views/PageNotFoundView.vue"),
    },
    {
      path: "/",
      name: "IndexView",
      component: IndexView,
      meta: { guest: true }
    },
    {
      path: "/HomeView",
      name: "HomeView",
      component: HomeView,
      meta: { auth: true }
    },
    {
      path: "/CreatePostView",
      name: "CreatePostView",
      component: CreatePostView,
      meta: { auth: true }
    },
    {
      path: '/posts/:id',
      name: 'EditPostView',
      component: EditPostView,
      meta: { auth: true }
    },

  ],
});

router.beforeEach(async (to, form) => {
  const authStore = useAuthStore();
  await authStore.storeAuth();

  if (!authStore.users && to.meta.auth) {
    return { name: 'IndexView' }
  }

    if (authStore.users && to.meta.guest) {
    return { name: 'HomeView' }
  }

});

export default router;
