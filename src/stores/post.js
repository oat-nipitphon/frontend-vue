import { defineStore } from "pinia";
import Swal from "sweetalert2";
import axiosAPI from "@/services/axiosAPI";
export const usePostStore = defineStore("postStore", {
  state: () => ({
    storePostEdit: [],
    storePosts: [],
    postType: [],
    errors: {},
  }),
  actions: {
    async storeGetPostType() {
      try {
        const res = await fetch(`/api/get_post_type`, {
          method: "GET",
        });

        if (!res.ok) {
          console.error("store get post type require false", res);
          return;
        }
        const data = await res.json();
        this.postType = data.postType;
      } catch (error) {
        console.error("store get post type function api error ", error);
      }
    },

    async storeGetPosts() {
      try {
        const res = await fetch(`/api/posts`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!res.status === 200) {
          (this.storePosts = "store require posts false"), res.error;
        }

        const data = await res.json();
        this.storePosts = data.posts;

        console.log("store require posts true", this.storePosts);
      } catch (error) {
        console.error("store get posts function api error ", error);
      }
    },

    async storeCreatePost(formData) {
      const result = await Swal.fire({
        title: "Confirm post creation!",
        text: "Do you want to confirm the creation of the post?",
        icon: "warning",
        showCancelButton: true,
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Confirm",
      });

      if (!result.isConfirmed) {
        Swal.close();
        return;
      }

      try {
        const res = await axiosAPI.post("/api/posts", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (res.status === 200 || res.status === 201) {
          console.log("store create post success");
          Swal.fire({
            title: "Successfully",
            text: "Your created post success.",
            icon: "success",
            timer: 1500,
            timerProgressBar: true,
          }).then(() => {
            this.router.push({ name: "HomeView" });
          });
        } else {
          console.log("store create post false");
          Swal.fire({
            title: "False",
            text: "Your created post false.",
            icon: "error",
            timer: 1500,
            timerProgressBar: true,
          }).then(() => {
            window.location.reload();
          });
        }
      } catch (error) {
        console.error("store create post function api error", error);
      }
    },

    async storeGetPostShow(post) {
      try {
        const res = await fetch(`/api/posts/${post}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!res.ok) {
          console.log('store get post show false ', res);
        }

        const data = await res.json();

        // this.storePostEdit = data.post;
        console.log('store get post show success ', data.post);
        return data.post;

      } catch (error) {
        console.error("store get post show function api error ", error);
      }
    },

    async storeUpdatePost(formData) {
      try {
        for (const [key, value] of formData.entries()) {
          console.log(`${key}:`, value);
        }
      } catch (error) {
        console.error("store update post", error);
      }
    },

    async storeDeletePost(id) {
      const result = await Swal.fire({
        title: "Confirm Delete!",
        text: "Are you sure you want to delete this post?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirm delete",
        cancelButtonText: "Cancel",
      });

      if (!result.isConfirmed) {
        Swal.close();
        return;
      }

      try {
        const res = await fetch(`/api/posts/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!res.ok) {
          console.log("store delete post false");
          return;
        }

        Swal.fire({
          title: "Success",
          text: "Delete post success",
          icon: "success",
          timer: 1200,
          timerProgressBar: true,
        }).then(() => {
          this.router.push({ name: "HomeView" });
        });
      } catch (error) {
        console.error("store delete post function error ", error);
      }
    },
  },
});
