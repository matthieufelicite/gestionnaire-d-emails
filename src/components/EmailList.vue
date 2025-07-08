<script setup lang="ts">
import {
  emails,
  fetchAvatarsForEmails,
  fetchEmails,
  type Email,
} from "../composables/useEmails";
import { ref, computed, onMounted } from "vue";

const selectedTab = ref<"inbox" | "trash">("inbox");
const isLoading = ref(false);

onMounted(async () => {
  isLoading.value = true;
  await fetchEmails();
  isLoading.value = false;
});

const inboxEmails = computed(() =>
  emails.value.filter((email) => !email.deleted)
);
const deletedEmails = computed(() =>
  emails.value.filter((email) => email.deleted)
);

const search = ref("");

const filteredInboxEmails = computed(() =>
  inboxEmails.value.filter(
    (email) =>
      email.subject.toLowerCase().includes(search.value.toLowerCase()) ||
      email.sender.emailAddress.name
        .toLowerCase()
        .includes(search.value.toLowerCase()) ||
      (email.description &&
        email.description.toLowerCase().includes(search.value.toLowerCase()))
  )
);
const filteredDeletedEmails = computed(() =>
  deletedEmails.value.filter(
    (email) =>
      email.subject.toLowerCase().includes(search.value.toLowerCase()) ||
      email.sender.emailAddress.name
        .toLowerCase()
        .includes(search.value.toLowerCase()) ||
      (email.description &&
        email.description.toLowerCase().includes(search.value.toLowerCase()))
  )
);

function restoreEmail(email: Email) {
  email.deleted = false;
  // Déplacer l'email restauré en haut de la liste
  const idx = emails.value.findIndex((e) => e.id === email.id);
  if (idx !== -1) {
    emails.value.splice(idx, 1);
    emails.value.unshift(email);
  }
}
function deleteEmail(email: Email) {
  email.deleted = true;
}
</script>

<template>
  <ul class="list bg-base-100 rounded-box shadow-md">
    <div class="p-4">
      <input
        v-model="search"
        type="text"
        placeholder="Rechercher un email..."
        class="input input-bordered w-full"
      />
    </div>
    <div class="flex border-b border-gray-300">
      <button
        @click="selectedTab = 'inbox'"
        :class="[
          'flex items-center justify-center gap-2 flex-1 px-4 py-2 text-sm font-medium transition-all duration-200',
          selectedTab === 'inbox'
            ? 'border-b-2 border-blue-600 text-blue-600 font-semibold'
            : 'text-gray-600 hover:text-blue-600',
        ]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-5 h-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z"
          />
        </svg>
        <span>Principale</span>
      </button>
      <button
        @click="selectedTab = 'trash'"
        :class="[
          'flex items-center justify-center gap-2 flex-1 px-4 py-2 text-sm font-medium transition-all duration-200',
          selectedTab === 'trash'
            ? 'border-b-2 border-blue-600 text-blue-600 font-semibold'
            : 'text-gray-600 hover:text-blue-600',
        ]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-5 h-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
        <span>Supprimés</span>
      </button>
    </div>
    <ul
      class="list bg-base-100 rounded-box shadow-md"
      v-if="selectedTab === 'inbox'"
    >
      <li
        v-for="email in filteredInboxEmails"
        :key="email.id"
        class="list-row flex items-center justify-between gap-4 p-4 border-b"
      >
        <div class="flex items-center gap-4">
          <img
            :src="
              email.avatarUrl ||
              `https://ui-avatars.com/api/?name=${email.sender.emailAddress.name}`
            "
            class="size-10 rounded-full object-cover"
          />
          <div>
            <router-link
              :to="{ name: 'EmailDetail', params: { id: email.id } }"
              class="hover:underline text-blue-700 font-semibold"
            >
              <div class="font-semibold">
                {{ email.sender.emailAddress.name }}
              </div>
              <div class="text-sm text-gray-500">{{ email.subject }}</div>
              <div class="text-xs text-gray-400">{{ email.description }}</div>
            </router-link>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <button class="btn btn-square btn-ghost" @click="deleteEmail(email)">
            <svg
              class="size-[1.2em]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                stroke-linejoin="round"
                stroke-linecap="round"
                stroke-width="2"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                ></path>
              </g>
            </svg>
          </button>
        </div>
      </li>
    </ul>

    <ul
      class="list bg-base-100 rounded-box shadow-md"
      v-if="selectedTab === 'trash'"
    >
      <li
        v-for="email in filteredDeletedEmails"
        :key="email.id"
        class="list-row flex items-center justify-between gap-4 p-4 border-b"
      >
        <div class="flex items-center gap-4">
          <img
            :src="
              email.avatarUrl ||
              `https://ui-avatars.com/api/?name=${email.sender.emailAddress.name}`
            "
            class="size-10 rounded-full object-cover"
          />
          <div>
            <div class="font-semibold">
              {{ email.sender.emailAddress.name }}
            </div>
            <div class="text-sm text-gray-500">{{ email.subject }}</div>
            <div class="text-xs text-gray-400">{{ email.description }}</div>
          </div>
        </div>
        <button class="btn btn-square btn-ghost" @click="restoreEmail(email)">
          <svg
            class="size-[1.6em]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              stroke-linejoin="round"
              stroke-linecap="round"
              stroke-width="2"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              ></path>
            </g>
          </svg>
        </button>
      </li>
    </ul>
  </ul>
</template>
