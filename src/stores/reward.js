import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

export const useRewardStore = defineStore("rewardStore", {
  state: () => ({
    rewards: null,
    errors: [],
  }),
  actions: {
    async storeGetRewards() {
      try {
        const res = await fetch(`/api/reward/getRewards`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          this.rewards = data.rewards;
        } else {
          this.rewards = "";
        }
        return;
      } catch (error) {
        console.error("store get reward function api error ", error);
      }
    },

    async storeCreateReward(form) {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to save this reward?",
        icon: "question",
        showCancelButton: true,
        cancelButtonText: "Cancel",
        cancelButtonColor: "#d33",
        showConfirmButton: true,
        confirmButtonText: "Save",
        confirmButtonColor: "#3085d6",
      });

      if (result.isConfirmed) {
        try {
          const res = await fetch("/api/rewards", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
          });

          const data = await res.json();

          if (!res.ok) {
            throw new Error(data.message || "Failed to save reward");
          }
          Swal.fire("Saved!", "Your reward has been saved.", "success");
        } catch (error) {
          console.error("store create reward function api error", error);
        }
      }
    },

    async editReward() {
      try {
      } catch (error) {
        console.error("store edit reward error function", error);
      }
    },

    async deleteReward(id) {
      try {
        const res = await fetch(`/api/reward/delete/${id}`, {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (res.ok) {
          console.log("store delete reward success", res);
          // return data.recoverPosts.filter(post => post.id !== postID);
          const data = await res.json();
          return data.modelReward.filter((reward) => reward.id !== id);
        } else {
          console.log("store delete reward false", res);
        }
      } catch (error) {
        console.error("store delete reward error function", error);
      }
    },

    async getReportRewards(userID) {
      try {
        const res = await fetch(`/api/cartItems/getReportReward/${userID}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          console.log("store get report reward request false", res);
        } else {
          return data.userPointCounter;
        }
      } catch (error) {
        console.error("store get report reward function error", error);
      }
    },

    async cancelReward(itemID) {
      try {
        const res = await axiosAPI.post(
          `/api/cartItems/cancel_reward/${itemID}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        console.log("cancel api reward", res);
      } catch (error) {
        console.error(error);
      }
    },
  },
});
