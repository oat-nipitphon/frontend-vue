import { defineStore } from "pinia";
import Swal from "sweetalert2";
import axiosAPI from "@/services/axiosAPI";
export const usePostStore = defineStore("postStore", {
  state: () => ({
    post: null,
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
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await res.json();
        if (res.ok) {
          console.log('store get posts success ', data.posts);
          this.storePosts = data.posts;
        } else {
          console.log('store get posts false ', res.error);
        }

      } catch (error) {
        console.error('store get posts function api error ', error);
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
          console.log('store create post success');
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
           console.log('store create post false');
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

        const data = await res.json();

        if (res.ok) {
          console.log("store get post show success ", res);
          console.log("store get post show success ", data);
        } else {
          console.log("store get post show false ", res);
        }
      } catch (error) {
        console.error("store get post show function api error ", error);
      }
    },

    async apiEditPost(formData) {
      console.log("store update post function ", formData);
      return;
      const result = await Swal.fire({
        title: "Confirm Edit!",
        text: "Are you sure you want to edit this post?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirm",
      });
    },

    async apiDeletePost(id) {
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

      if (result.isConfirmed) {
        try {
          const res = await fetch(`/api/posts/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });

          if (res.ok) {
            console.log("store delete post success");
          } else {
            console.log("store delete post false");
          }
        } catch (error) {
          console.error("store delete function api ", error);
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.close();
      }
      return;
    },
  },
});
