<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from "vue";
import { RouterLink } from "vue-router";
import Swal from "sweetalert2";
import axiosAPI from "@/services/axiosAPI";
import BaseInput from "@/components/BaseInput.vue";
import BaseLabel from "@/components/BaseLabel.vue";
import BaseSelect from "@/components/BaseSelect.vue";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";

import { useAuthStore } from "@/stores/auth";
const { storeRegister, storeLogin } = useAuthStore();

const open = ref(false);
const modalType = ref("register");
const userStatus = ref([]);
const isSubmitting = ref(false);

const emailError = ref("");
const usernameError = ref("");

const form = reactive({
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
  emailUsername: "",
  statusID: "",
});

const openModal = (type) => {
  modalType.value = type;
  open.value = true;
};

const closeModal = () => {
  open.value = false;
  resetForm();
};

const resetForm = () => {
  Object.assign(form, {
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    emailUsername: "",
    statusID: "",
  });
  emailError.value = "";
  usernameError.value = "";
};

const checkEmail = async () => {
  if (!form.email.includes("@")) {
    emailError.value = "Invalid email format.";
    return;
  }
  try {
    const response = await axiosAPI.post("/api/register/check_email", {
      email: form.email,
    });
    emailError.value = response.data.exists
      ? "This email is already in use."
      : "This email is available.";
  } catch (error) {
    console.error(error);
    emailError.value = "Error checking email.";
  }
};

const checkUsername = async () => {
  if (!form.username) {
    usernameError.value = "Please enter your username.";
    return;
  }
  try {
    const response = await axiosAPI.post("/api/register/check_username", {
      username: form.username,
    });
    usernameError.value = response.data.exists
      ? "This username is already taken."
      : "This username can be used";
  } catch (error) {
    console.error(error);
    usernameError.value = "Error checking username.";
  }
};

const passwordError = computed(() => {
  if (!form.password)
    return { message: "Please enter your password.", valid: false };
  if (form.password.length < 6)
    return { message: "Password must be at least 6 characters.", valid: false };
  return { message: "Password is strong.", valid: true };
});

const passwordConfirmError = computed(() => {
  if (!form.confirmPassword)
    return { message: "Please confirm your password.", valid: false };
  if (form.password !== form.confirmPassword)
    return { message: "Passwords do not match.", valid: false };
  return { message: "Passwords match.", valid: true };
});

const onRegister = async () => {
  if (form.password !== form.confirmPassword) {
    Swal.fire({
      title: "Passwords don't match",
      text: "Please check your passwords again.",
      icon: "error",
      confirmButtonText: "OK",
      confirmButtonColor: "#33cc33",
    });
    return;
  }

  isSubmitting.value = true;
  try {
    await storeRegister(form);
    closeModal();
  } catch (error) {
    console.error(error);
    Swal.fire("Error", "Registration failed.", "error");
  } finally {
    isSubmitting.value = false;
  }
};

const onLogin = async () => {
  isSubmitting.value = true;
  try {
    await storeLogin(form);
    closeModal();
  } catch (error) {
    console.error(error);
    Swal.fire("Error", "Login failed.", "error");
  } finally {
    isSubmitting.value = false;
  }
};

const getUserStatus = async () => {
  try {
    const res = await fetch('/api/get_user_status', {
      method: 'GET',
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('getUserStatus() response false ', data);
    }

    console.log('get user status success ', data.userStatus);

    return data.userStatus;

  } catch (error) {
    console.error('getUserStatus() error ', error);
  }
  
}

onMounted(async () => {
  userStatus.value = await getUserStatus();
});

const handleEscape = (e) => {
  if (e.key === "Escape") closeModal();
};

onMounted(() => window.addEventListener("keydown", handleEscape));
onUnmounted(() => window.removeEventListener("keydown", handleEscape));
</script>

<template>
  <div class="mt-4 flex justify-center gap-4 sm:mt-6">
    <a
      class="inline-block rounded border border-indigo-600 bg-indigo-600 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
      @click="openModal('register')"
    >
      Sign up
    </a>

    <a
      class="inline-block rounded border border-gray-200 px-5 py-3 font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900"
      @click="openModal('login')"
    >
      Sign in
    </a>
  </div>
  <div class="flex items-center justify-center">
    <div class="m-auto w-full">
      <TransitionRoot as="template" :show="open">
        <Dialog
          class="fixed inset-0 z-10 flex items-start justify-center mt-20"
          @close="closeModal"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md bg-white rounded-lg shadow-xl p-6"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-semibold text-gray-900 mb-4"
              >
                {{ modalType === "register" ? "Register" : "Login" }}
              </DialogTitle>

              <form
                class="space-y-4"
                @submit.prevent="
                  modalType === 'register' ? onRegister() : onLogin()
                "
              >
                <div v-if="modalType === 'register'">
                  <BaseLabel for-id="email" text="Email" />
                  <BaseInput
                    id="email"
                    type="text"
                    placeholder="email"
                    v-model="form.email"
                    @blur="checkEmail"
                  />
                  <p
                    :class="
                      emailError.includes('available')
                        ? 'text-green-600'
                        : 'text-red-600'
                    "
                    class="text-sm mt-2"
                  >
                    {{ emailError }}
                  </p>

                  <BaseLabel for-id="username" text="Username" />
                  <BaseInput
                    id="username"
                    type="text"
                    placeholder="username"
                    v-model="form.username"
                    @blur="checkUsername"
                  />
                  <p
                    :class="
                      usernameError.includes('can be used')
                        ? 'text-green-600'
                        : 'text-red-600'
                    "
                    class="text-sm mt-2"
                  >
                    {{ usernameError }}
                  </p>
                </div>

                <div v-if="modalType === 'login'">
                  <BaseLabel for-id="emailUsername" text="Email or Username" />
                  <BaseInput
                    id="emailUsername"
                    type="text"
                    placeholder="email or username"
                    v-model="form.emailUsername"
                  />
                </div>

                <div>
                  <BaseLabel for-id="password" text="Password" />
                  <BaseInput
                    id="password"
                    type="password"
                    placeholder="password"
                    v-model="form.password"
                  />
                  <p
                    :class="
                      passwordError.valid ? 'text-green-600' : 'text-red-600'
                    "
                    class="text-sm mt-2"
                  >
                    {{ passwordError.message }}
                  </p>
                </div>

                <div v-if="modalType === 'register'">
                  <BaseLabel for-id="confirmPassword" text="Confirm Password" />
                  <BaseInput
                    id="confirmPassword"
                    type="password"
                    placeholder="confirm password"
                    v-model="form.confirmPassword"
                  />
                  <p
                    :class="
                      passwordConfirmError.valid
                        ? 'text-green-600'
                        : 'text-red-600'
                    "
                    class="text-sm mt-2"
                  >
                    {{ passwordConfirmError.message }}
                  </p>

                  <BaseSelect
                    id="statusID"
                    label="Status"
                    v-model="form.statusID"
                    :options="userStatus"
                    optionKey="id"
                    optionLabel="name"
                    placeholder="Select Status"
                  />
                  <p v-if="!form.statusID" class="text-red-600 text-sm mt-2">
                    Please select an account status.
                  </p>
                  <p v-else class="text-green-600 text-sm mt-2">
                    Account status selected successfully.
                  </p>
                </div>

                <button
                  type="submit"
                  class="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-500"
                  :disabled="isSubmitting"
                >
                  <span v-if="isSubmitting">Loading...</span>
                  <span v-else>{{
                    modalType === "register" ? "Register" : "Login"
                  }}</span>
                </button>
              </form>

              <div class="mt-4 flex justify-between text-sm text-gray-500">
                <RouterLink
                  v-if="modalType === 'login'"
                  @click.prevent="modalType = 'register'"
                  to="#"
                >
                  Don't have an account? Register
                </RouterLink>
                <RouterLink v-else @click.prevent="modalType = 'login'" to="#">
                  Already have an account? Login
                </RouterLink>
              </div>

              <div class="mt-6 text-right">
                <button
                  class="px-4 py-2 bg-gray-200 text-gray-900 rounded-md hover:bg-gray-300"
                  @click="closeModal"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </Dialog>
      </TransitionRoot>
    </div>
  </div>
</template>
