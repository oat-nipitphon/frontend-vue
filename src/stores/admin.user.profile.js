import { defineStore } from 'pinia'
import { useRoute } from 'vue-router'
import Swal from 'sweetalert2'

export const useAdminUserProfileStore = defineStore('adminUserProfileStore', {
  state: () => ({
    storeUserProfiles: null,
    errors: {},
  }),
  actions: {
    async adminAPIGETuserProfiles() {
      try {
        const res = await fetch(`/api/admin/userProfiles`, {
          method: 'GET',
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })

        const data = await res.json()
        if (res.ok) {
          return data.userProfiles
        } else {
          console.log('store get user profile false :: ', data.error)
        }
      } catch (error) {
        console.error('store admin user profile error :: ', error)
      }
    },

    async adminAPIGETUserProfileEdit(userProfile) {
      try {
        const res = await fetch(`/api/admin/userProfiles/${userProfile}`, {
          method: 'GET',
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })

        const data = await res.json()

        if (!res.ok) {
          console.log('adminAPIGETUserProfileEdit res false', res)
          return
        }

        console.log(data.userProfile)
        return data.userProfile
      } catch (error) {
        console.error('get data edit function error', error)
      }
    },

    async adminUpdateUserProfile() {
      const result = await Swal.fire({
        title: 'Confirm Update!',
        text: 'Are you sure you want to update this userprofile?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
      })
    },

    async storeAdminAPIDeleteUserProfile(userProfile) {
      console.log('store admin delete', userProfile)
      const result = await Swal.fire({
        title: 'Confirm Delete!',
        text: 'Are you sure you want to delete this userprofile?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
      })

      if (result.isConfirmed) {
        try {
          const res = await fetch(`/api/admin/userProfiles/${userProfile}`, {
            method: 'DELETE',
            headers: {
              authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          })

          if (res.ok) {
            Swal.fire({
              title: 'Delete success.',
              icon: 'success',
              timer: 1300,
            })

            window.location.reload()
          }

          console.log('store admin delete user profile res false')
        } catch (error) {
          console.error('store admin delete user profile function error', error)
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.close()
      }
    },
  },
})
