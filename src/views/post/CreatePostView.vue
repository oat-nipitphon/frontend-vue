<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { usePostStore } from "@/stores/post";

const {} = usePostStore();

import Swal from "sweetalert2";
import axiosAPI from "@/services/axiosAPI";
import imageDefault from "@/assets/images/keyboard.jpg";
import PageHeader from "@/components/PageHeader.vue";
import BaseLabel from "@/components/BaseLabel.vue";
import BaseInput from "@/components/BaseInput.vue";
import BaseSelect from "@/components/BaseSelect.vue";
import BaseTextArea from "@/components/BaseTextArea.vue";

const router = useRouter();
const authAuth = useAuthStore();

const postTypes = ref(null);
const isSelectType = ref(true);
const isButtonSelect = ref(false);
const isNewType = ref(false);

const imageFile = ref(null);
const imageUrl = ref(null);

const form = ref({
  title: "",
  content: "",
  refer: "",
  typeID: "",
  newType: "",
});

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

const handleImageSelected = (event) => {
  const file = event.target.files[0];
  if (file) {
    imageFile.value = file;
    imageUrl.value = URL.createObjectURL(file);
  }
};

const onCreatePost = async () => {
  const formData = new FormData();

  formData.append("userID", authAuth.storeUser.user_login.id);
  formData.append("title", form.value.title);
  formData.append("content", form.value.content);
  formData.append("refer", form.value.refer);
  formData.append("newType", form.value.newType);
  formData.append("typeID", form.value.typeID);

  if (imageFile.value) {
    formData.append("imageFile", imageFile.value);
  } else {
    const response = await fetch(imageFileBasic);
    const blob = await response.blob();
    const file = new File([blob], "default-image.jpg", { type: "image/jpeg" });
    formData.append("imageFile", file);
  }

  try {
    const response = await axiosAPI.post("/api/posts", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    Swal.fire({
      title: "Confirm post creation!",
      text: "Do you want to confirm the creation of the post?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      cancelButtonText: "No",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Success",
          text: "Post created successfully.",
          icon: "success",
          timer: 1200,
        }).then(() => {
          this.router.push({ name: "HomeView" });
        });
      }
    });
  } catch (error) {
    console.error("Error creating post:", error);
  }
};

const onCancel = () => {
  router.push({ name: "HomeView" });
};

onMounted(async () => {
  postTypes.value = await apiGetPostTypes();
});
</script>

<template>
  <div class="bg-white rounded-xl shadow-lg mt-5 max-w-5xl m-auto p-10">
    <div class="m-auto">
      <PageHeader title="Create post" />
    </div>

    <!-- Post Title -->
    <div class="mt-3">
      <BaseLabel for-id="labelPostTitle" text="Title" />
      <BaseInput
        id="postTitle"
        type="text"
        placeholder="input title ..."
        v-model="form.title"
      />
    </div>

    <!-- Post Content -->
    <div class="mt-3">
      <BaseLabel for-id="labelPostContent" text="Content" />
      <BaseTextArea
        id="postContent"
        type="text"
        placeholder="input content ..."
        v-model="form.content"
      />
    </div>

    <!-- Post Refer -->
    <div class="mt-3">
      <BaseLabel for-id="labelRefer" text="Refer" />
      <BaseInput
        id="postRefer"
        type="text"
        placeholder="input refer ..."
        v-model="form.refer"
      />
    </div>

    <div class="mt-3">
      <!-- Select Type Post -->
      <div class="grid mt-5" v-if="isSelectType">
        <BaseLabel for-id="labelSeleteType" text="Select type" />
        <BaseSelect
          id="postType"
          @change="onSelectType"
          v-model="form.typeID"
          :options="postTypes"
          optionKey="id"
          optionLabel="post_type_name"
          placeholder="Please select a type"
        >
          <option value="new">add type +</option>
        </BaseSelect>
      </div>

      <!-- New Type Post -->
      <div class="grid grid-rows-2 mt-5" v-if="isNewType">
        <div class="grid grid-cols-2">
          <div>
            <BaseLabel for-id="labelNewType" text="Add type" />
          </div>
          <div v-if="isButtonSelect" class="flex justify-end mt-auto mb-auto">
            <button @click="onSelectAgain" class="btn btn-sm">
              <BaseLabel for-id="labelNewType" text="New Type" />
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

    <!-- Upload File Section -->
    <div class="mt-3">
      <BaseLabel for-id="labelImage" text="Image" />
      <div class="bg-white mt-2">
        <input
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
      </div>
    </div>

    <!-- Buttons: Save and Cancel -->
    <div class="flex justify-end mt-5">
      <button
        @click="onCreatePost"
        type="button"
        class="btn btn-primary btn-sm m-3"
      >
        Save
      </button>
      <button @click="onCancel" type="button" class="btn btn-danger btn-sm m-3">
        Cancel
      </button>
    </div>
  </div>
</template>

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

/* Button Styles */
.btn-outline-primary {
  border-color: #3498db;
  color: #3498db;
}

.btn-outline-primary:hover {
  background-color: #3498db;
  color: white;
}

.btn-primary {
  background-color: #3498db;
  color: white;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #2980b9;
}

.btn-danger {
  background-color: #e74c3c;
  color: white;
  transition: background-color 0.3s ease;
}

.btn-danger:hover {
  background-color: #c0392b;
}
</style>
