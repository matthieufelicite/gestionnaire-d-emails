<script setup lang="ts">
import EmailList from "../components/EmailList.vue";
import AddEmail from "../components/AddEmail.vue";
</script>

<template>
<main class="p-6">
    <div class="flex flex-col gap-6">
        <div class="flex justify-end">
            <AddEmail />
        </div>
        <EmailList />
    </div>
</main>
</template>
