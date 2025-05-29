import { defineStore } from "pinia";
import Swal from "sweetalert2";

export const useContactStore = defineStore("contactStore", {
  state: () => ({
    contacts: null,
    errors: {},
  }),
  actions: {
    async storeGetContactUserProfiles(profileID) {
      try {
        const res = await fetch(`api/profile/contacts/${profileID}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          console.log("store get contact user profile success", res);
          console.log("store get contact user profile success", data);
        }
        console.log("store get contact user profile false", res);
      } catch (error) {
        console.error(
          "store get contact user profile function api error ",
          error
        );
      }
    },
  },
});
