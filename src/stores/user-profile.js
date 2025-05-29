import { defineStore } from "pinia";
import Swal from "sweetalert2";
export const useStoreUserProfile = defineStore("storeUserProfile", {
  state: () => ({
    userProfiles: null,
    errors: {},
  }),
  actions: {
    async storeGetUserStatus() {
      try {
        const res = await fetch(`/api/get_user_status`, {
          method: "GET",
        });
        const data = await res.json();
        if (res.ok) {
          return data.userStatus;
        } else {
          data = "";
        }
        return;
      } catch (error) {
        console.error("store get user status function api error ", error);
      }
    },

    async storeGetUserProfiles() {
      try {
        const res = await fetch(`/api/user_profiles/${userProfile}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          console.log("store get user profiles success ", res);
          console.log("store get user profiles success ", data);
        } else {
          console.log("store get user profiles false ", res);
        }
      } catch (error) {
        console.error("store get user profiles function api error ", error);
      }
    },

    async storeConfirmUpdateUser(formData) {
      const result = await Swal.fire({
        title: "Confirm Update",
        text: "Are you sure you want to update ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "yes",
        cancelButtonText: "no",
      });

      if (result.isConfirmed) {
        try {
          const res = await fetch("/api/update/user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(formData),
          });

          const data = await res.json();
          if (res.ok) {
            console.log("store confirm update user success ", res);
            console.log("store confirm update user success ", data);
          } else {
            console.log("store confirm update user false ", res);
          }
        } catch (error) {
          console.error("store confirm update user function api error ", error);
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.close;
      }

      return;
    },

    async storeConfirmUpdateUser(formData) {
      const result = await Swal.fire({
        title: "Confirm Update",
        text: "Are you sure you want to update ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "yes",
        cancelButtonText: "no",
      });

      if (result.isConfirmed) {
        try {
          const res = await fetch("/api/update/user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(formData),
          });

          const data = await res.json();
          if (res.ok) {
            console.log("store confirm update user success ", res);
            console.log("store confirm update user success ", data);
          } else {
            console.log("store confirm update user false ", res);
          }
        } catch (error) {
          console.error("store confirm update user function api error ", error);
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.close;
      }

      return;
    },
  },
});
