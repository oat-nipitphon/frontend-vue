import { defineStore } from "pinia";
import Swal from "sweetalert2";

export const usePostStore = defineStore("postStore", {
  state: () => ({
    storePost: null,
    storePosts: [],
    storePostTypes: [],
    errors: {},
  }),
  actions: {
    async storeGetPostType() {
      try {
        const res = await fetch(`/api/get_post_type`, {
          method: "GET",
        });
        const data = await res.json();
        if (res.ok) {
          this.storePostTypes = data;
        }

        console.log("store get post type response false");
        return;
      } catch (error) {
        console.error("store get post type function api error ", error);
      }
    },

    async storeGetPosts() {
      try {
        const res = await fetch("/api/get_user_status", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();

        if (!res.ok) {
          console.error("getUserStatus() response false", data);
          return null; // หรือจะโยน error ก็ได้ throw new Error(...)
        }

        if (!data || typeof data.userStatus === "undefined") {
          console.warn(
            "getUserStatus() userStatus not found in response",
            data
          );
          return null;
        }

        console.log("get user status success", data.userStatus);
        return data.userStatus;
      } catch (error) {
        console.error("getUserStatus() error", error);
        return null;
      }
    },

    async storeCreatePost(formData) {
      try {
        const res = await fetch(`/api/posts`, {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        });

        const data = await res.json();

        if (res.ok) {
          console.log("store create post success ", res);
          console.log("store create post success ", data);
        } else {
          console.log("store create post false", res);
        }
      } catch (error) {
        console.error("store create post function api error ", error);
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
