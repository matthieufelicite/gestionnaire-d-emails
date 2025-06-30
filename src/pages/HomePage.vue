<script setup lang="ts">
import EmailList from "../components/EmailList.vue";
import AddEmail from "../components/AddEmail.vue";
import SignInButton from "../components/auth/SignInButton.vue";
</script>

<template>
  <main class="p-6">
    <div class="flex flex-col gap-6">
      <div class="flex justify-end">
        <AddEmail />
      </div>
      <EmailList />
    </div>
    <SignInButton class="mt-4" />
  </main>
</template>
