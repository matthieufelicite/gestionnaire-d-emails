<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { emails, type Email } from "../composables/useEmails";

const route = useRoute();
const email = ref<Email | null>(null);

onMounted(() => {
  const id = route.params.id as string;
  email.value = emails.value.find((e) => e.id === id) || null;
});
</script>

<template>
  <div
    v-if="email"
    class="max-w-2xl mx-auto bg-base-100 p-6 rounded-box shadow"
  >
    <h2 class="text-xl font-bold mb-2">{{ email.subject }}</h2>
    <div class="mb-2 text-gray-500">
      De : {{ email.sender.emailAddress.name }} &lt;{{
        email.sender.emailAddress.address
      }}&gt;
    </div>
    <div class="mb-2 text-gray-400 text-xs">
      Reçu le : {{ new Date(email.receivedDateTime).toLocaleString() }}
    </div>
    <div class="mb-4 text-gray-600">{{ email.description }}</div>
    <div class="prose" v-html="email.body.content"></div>
  </div>
  <div v-else class="text-center text-gray-400 mt-10">Email introuvable.</div>
</template>
