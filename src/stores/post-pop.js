import { defineStore } from "pinia";
import Swal from "sweetalert2";

export const usePostPopStore = defineStore("postPopStore", {
  state: () => ({
    posts: null,
    errors: {},
  }),
  actions: {
    async storePostPopLike(userID, postID, popStatusLike) {
      try {
        const res = await fetch(
          `/api/posts/popularity/${userID}/${postID}/${popStatusLike}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await res.json();

        if (res.ok) {
          console.log("store post pop like success ", res);
          console.log("store post pop like success ", data);
        } else {
          console.log("store post pop like false ", res);
        }
      } catch (error) {
        console.error("store post pop like function api error ", error);
      }
    },

    async storePostPopDisLike(userID, postID, popStatusDisLike) {
      try {
        const res = await fetch(
          `/api/posts/popularity/${userID}/${postID}/${popStatusDisLike}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await res.json();
        if (res.ok) {
          console.log("store post pop dis like success ", res);
          console.log("store post pop dis like success ", data);
        } else {
          console.log("store post pop dis like false ", res);
        }
      } catch (error) {
        console.error("store post pop dis like function api error ", error);
      }
    },
  },
});
