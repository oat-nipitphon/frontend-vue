import { defineStore } from "pinia";
import Swal from "sweetalert2";

export const usePostRecoverStore = defineStore("postRecoverStore", {
  state: () => ({
    postsRecover: null,
    errors: {},
  }),
  actions: {
    // จัดเก็บโพส
    async storeConfirmStorePost(postID) {
      const result = await Swal.fire({
        title: "ยืนยัน",
        text: "คุณต้องการจัดเก็บบทความนี้ใช่หรือไม่ ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "จัดเก็บ",
        cancelButtonText: "ยกเลิก",
      });

      if (result.isConfirmed) {
        try {
          const res = await fetch(`/api/posts/store/${postID}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });

          const data = await res.json();

          if (res.ok) {
            console.log("store confirm store post success ", res);
            console.log("store confirm store post success ", data);
          } else {
            console.log("store confirm store post false ", res);
          }
        } catch (error) {
          console.error("store confirm store post function api error ", error);
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.close();
      }

      return;
    },

    async storeGetPostsRecover(userID) {
      try {
        const res = await fetch(`/api/posts/report_recover/${userID}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          console.log("store get posts recover success ", res);
          console.log("store get posts recover success ", data);
        } else {
          console.log("store get posts recover false ", res);
        }
      } catch (error) {
        console.error("store get posts recover function api error ", error);
      }
    },

    async storeConfirmRecoverPost(postID) {
      const result = await Swal.fire({
        title: "ยืนยัน",
        text: "คุณต้องการกู้คืนบทความนี้ใช่หรือไม่ ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "กู้คืน",
        cancelButtonText: "ยกเลิก",
      });

      if (result.isConfirmed) {
        try {
          const res = await fetch(`/api/posts/recover/${postID}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });

          const data = await res.json();

          if (res.ok) {
            console.log("store confirm recover post success ", res);
            console.log("store confirm recover post success ", data);
          } else {
            console.log("store confirm recover post false ", res);
          }
        } catch (error) {
          console.error(
            "store confirm recover post function api error ",
            error
          );
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.close;
      }
      return;
    },

    async storePostRecoverDelete(id) {
      try {
        const res = await fetch(`/api/posts/delectSelected`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          console.log("store post recover delete success ", res);
          console.log("store post recover delete success ", data);
        } else {
          console.log("store post recover delete false ", res);
        }
      } catch (error) {
        console.error("store post recover delete function api error ", error);
      }
    },
  },
});
