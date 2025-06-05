<template>
  <div class="bg-white rounded-xl shadow-lg mt-5 max-w-5xl m-auto p-10">
    <!-- Page Header -->
    <div class="m-auto">
      <PageHeader title="Create post" />
    </div>

    <!-- Title -->
    <div class="mt-3">
      <BaseLabel for-id="labelPostTitle" text="Title" />
      <BaseInput
        id="postTitle"
        type="text"
        placeholder="input title ..."
        v-model="form.title"
      />
    </div>

    <!-- Content -->
    <div class="mt-3">
      <BaseLabel for-id="labelPostContent" text="Content" />
      <BaseTextArea
        id="postContent"
        type="text"
        placeholder="input content ..."
        v-model="form.content"
      />
    </div>

    <!-- Refer -->
    <div class="mt-3">
      <BaseLabel for-id="labelRefer" text="Refer" />
      <BaseInput
        id="postRefer"
        type="text"
        placeholder="input refer ..."
        v-model="form.refer"
      />
    </div>

    <!-- Type -->
    <div class="mt-3">
      <!-- Select  -->
      <div class="grid mt-5" v-if="isSelectType">
        <BaseLabel for-id="labelSeleteType" text="Select type" />
        <BaseSelect
          id="postType"
          @change="onSelectType"
          v-model="form.typeID"
          :options="postTypes"
          optionKey="id"
          optionLabel="name"
          placeholder="Please select a type"
        >
          <option value="new">add type +</option>
        </BaseSelect>
      </div>

      <!-- Add -->
      <div class="grid grid-rows-2 mt-5" v-if="isNewType">
        <div class="grid grid-cols-2">
          <div>
            <BaseLabel for-id="labelNewType" text="Add type" />
          </div>
          <div v-if="isButtonSelect" class="flex justify-end mt-auto mb-auto">
            <button @click="onSelectAgain" class="btn btn-sm">
              <BaseLabel for-id="labelNewType" text="Select type again" />
            </button>
          </div>
        </div>
        <BaseInput
          id="postNewType"
          type="text"
          v-model="form.newType"
          placeholder="input new type .."
        />
      </div>
    </div>

    <!-- Image -->
    <div class="mt-3">
      <BaseLabel for-id="labelImage" text="Image File" />
      <BaseInputFileImageCover
        label="Cover photo"
        input-id="cover-upload"
        @update:file="FileImageUploadCover = $event"
      />
      <!-- <div class="bg-white mt-2">
        <BaseInput
          id="fileImage"
          accept="image/*"
          type="file"
          class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          @change="handleImageSelected"
        />
        <img
          :src="imageUrl || imageDefault"
          alt="Image Preview"
          class="ibox-image-post mt-3"
        />
      </div> -->
    </div>

    <!-- Button Event -->
    <div class="flex justify-end mt-5">
      <button
        type="submit"
        class="m-auto group relative inline-block text-sm font-medium text-white focus:ring-3 focus:outline-hidden"
        @click="onCreatePost"
      >
        <span class="absolute inset-0 border border-blue-600"></span>
        <span
          class="block border border-blue-600 bg-blue-600 px-12 py-3 transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1"
        >
          Save
        </span>
      </button>

      <button
        type="submit"
        class="m-auto group relative inline-block text-sm font-medium text-white focus:ring-3 focus:outline-hidden"
        @click="onCancel"
      >
        <span class="absolute inset-0 border border-red-600"></span>
        <span
          class="block border border-red-600 bg-red-600 px-12 py-3 transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1"
        >
          Cancel
        </span>
      </button>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";
import { usePostStore } from "@/stores/post";

import Swal from "sweetalert2";
import axiosAPI from "@/services/axiosAPI";
import imageDefault from "@/assets/images/keyboard.jpg";
import PageHeader from "@/components/PageHeader.vue";
import BaseLabel from "@/components/BaseLabel.vue";
import BaseInput from "@/components/BaseInput.vue";
import BaseSelect from "@/components/BaseSelect.vue";
import BaseTextArea from "@/components/BaseTextArea.vue";
import BaseInputFileImageCover from "@/components/FileImageUploadCover.vue";

const router = useRouter();
const authAuth = useAuthStore();
const postStore = usePostStore();
const postTypes = ref([]);
const isSelectType = ref(true);
const isButtonSelect = ref(false);
const isNewType = ref(false);

// input require file value
const FileImageUploadCover = ref(null);

const form = ref({
  title: "",
  content: "",
  refer: "",
  typeID: "",
  newType: "",
});

const { storeCreatePost } = usePostStore();

const onSelectType = () => {
  if (form.value.typeID === "new") {
    isSelectType.value = false;
    isNewType.value = true;
    isButtonSelect.value = true;
    form.value.typeID = 0;
  } else {
    form.value.newType = 0;
  }
};

const onSelectAgain = () => {
  isSelectType.value = true;
  isNewType.value = false;
  isButtonSelect.value = false;
};

const onCreatePost = async () => {
  const formData = new FormData();
  console.log("profile id", authAuth.users.userProfile.id);

  formData.append("profile_id", authAuth.users.userProfile.id);
  formData.append("type_id", form.value.typeID);
  formData.append("new_type", form.value.newType);
  formData.append("title", form.value.title);
  formData.append("content", form.value.content);
  formData.append("refer", form.value.refer);

  if (FileImageUploadCover.value) {
    formData.append("image_file", FileImageUploadCover.value);
  } else {
    const response = await fetch(imageDefault);
    const blob = await response.blob();
    const file = new File([blob], "default-image.jpg", { type: "image/jpeg" });
    formData.append("image_file", file);
  }

  // Check data require form data
  for (const [key, value] of formData.entries()) {
    console.log(`${key}:`, value);
  }

  await storeCreatePost(formData);

};

const onCancel = () => {
  router.push({ name: "HomeView" });
};

const getPostTypes = async () => {
  try {
    const res = await axiosAPI.get("/api/get_post_types");

    if (!res.ok) {
      console.log("get post type false", res);
    }
    console.log("get post type success", res.postTypes);
    return res.data;
  } catch (error) {
    console.error("get post type function error ", error);
  }
};

onMounted(async () => {
  postTypes.value = await getPostTypes();
  console.log("post type create post view ", postTypes.value);
});
</script>
<style scoped>
/* Image Preview Styles */
.ibox-image-post {
  margin: auto;
  margin-top: 30px;
  margin-bottom: 30px;
  width: 90%;
  height: 350px;
  object-fit: cover;
}
</style>
