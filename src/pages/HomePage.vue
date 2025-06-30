<script setup lang="ts">
import EmailList from "../components/EmailList.vue";
import AddEmail from "../components/AddEmail.vue";
import SignOutButton from "../components/auth/SignOutButton.vue";
</script>

<template>
  <nav class="navbar bg-base-100 shadow-sm p-6">
    <div class="flex-1">
      <h1 class="font-bold">Gestionnaire d'emails</h1>
    </div>
    <div class="flex-none">
      <SignOutButton />
    </div>
  </nav>
  <main class="p-6">
    <div class="flex flex-col gap-6">
      <div class="flex justify-end">
        <AddEmail />
      </div>
      <EmailList />
    </div>
  </main>
</template>
