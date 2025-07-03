<script setup lang="ts">
import { ref, onMounted } from "vue";
import EmailList from "../components/EmailList.vue";
import SignOutButton from "../components/auth/SignOutButton.vue";

interface UserInfo {
  name?: string;
  username?: string;
  email?: string;
}

const user = ref<UserInfo | null>(null);
onMounted(() => {
  const userStr = localStorage.getItem("user");
  if (userStr) {
    user.value = JSON.parse(userStr);
  }
});
</script>

<template>
  <nav class="navbar bg-base-100 shadow-sm p-6">
    <div class="flex-1">
      <h1 class="font-bold">Gestionnaire d'emails</h1>
    </div>
    <div class="flex gap-6">
      <SignOutButton />
      <div class="flex-none flex items-center gap-3">
        <div class="avatar avatar-placeholder" v-if="user && user.name">
          <div class="bg-neutral text-neutral-content w-8 rounded-full">
            <span class="text-xs">
              {{
                user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
              }}
            </span>
          </div>
        </div>
        <div v-else class="w-10 h-10 rounded-full bg-gray-300 border"></div>
        <div v-if="user && user.name" class="flex flex-col">
          <span class="font-semibold">{{ user.name }}</span>
          <span
            v-if="user.username || user.email"
            class="text-xs text-gray-500"
          >
            {{ user.username || user.email }}
          </span>
        </div>
      </div>
    </div>
  </nav>
  <main class="p-6">
    <div class="flex flex-col gap-6">
      <EmailList />
    </div>
  </main>
</template>
