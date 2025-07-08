<!-- <script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { emails, type Email } from "../composables/useEmails";

const route = useRoute();
const email = ref<Email | null>(null);

onMounted(() => {
  const id = route.params.id as string;
  email.value = emails.value.find((e) => e.id === id) || null;
});
</script> -->

<!-- <template>
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
</template> -->

<template>
  <div v-if="email" class="max-w-4xl mx-auto bg-white rounded-lg shadow-sm">
    <!-- Header avec boutons d'actions - fond coloré -->
    <div class="flex items-center justify-between p-4" style="background-color: #EDEBFA">
      <div class="flex space-x-2">
        <button class="p-2 hover:bg-gray-100 rounded" @click="$router.push('/')">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <button class="p-2 hover:bg-gray-100 rounded" @click="email.deleted = true ; $router.push('/')" >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
      <div class="text-xs text-gray-500">
        {{ new Date(email.receivedDateTime).toLocaleString() }}
      </div>
    </div>

    <!-- Contenu principal -->
    <div class="p-6">
      <!-- Sujet avec couleur spécifique et gras -->
      <h1 class="text-2xl font-bold mb-6" style="color: #B09BC4">{{ email.subject }}</h1>

      <!-- En-tête de l'email -->
      <div class="flex items-start mb-6">
        <img 
          :src="email.avatarUrl || `https://ui-avatars.com/api/?name=${email.sender.emailAddress.name}&background=random`" 
          class="w-10 h-10 rounded-full mr-4"
        />
        <div class="flex-1">
          <div class="font-medium text-gray-900">{{ email.sender.emailAddress.name }}</div>
          <div class="text-xs text-gray-500 mt-1">{{ email.sender.emailAddress.address }}</div>
          <div class="text-xs text-gray-500 mt-1">À moi</div>
        </div>
      </div>

      <!-- Corps du message -->
      <div class="prose max-w-none text-gray-800" v-html="email.body.content"></div>
    </div>
  </div>

  <div v-else class="text-center py-20 text-gray-600">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
    <p class="mt-3 text-lg">Email introuvable</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { emails } from "../composables/useEmails";

const route = useRoute();
const email = ref(emails.value.find((e) => e.id === route.params.id));
</script>

<style scoped>
.prose :deep(p) {
  margin-bottom: 1em;
  line-height: 1.6;
  color: #1f2937; /* gray-800 */
}
.prose :deep(a) {
  color: #1a73e8;
  text-decoration: underline;
}
</style>