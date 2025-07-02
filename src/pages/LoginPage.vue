<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-base-200"
  >
    <div class="p-8 bg-base-100 rounded-box shadow-md">
      <SignInButton @signed-in="onSignedIn" />
    </div>
  </div>
</template>

<script>
import SignInButton from "@/components/auth/SignInButton.vue";

export default {
  components: { SignInButton },
  methods: {
    onSignedIn(user) {
      this.$emit("signed-in", user);
    },
  },
};
</script>
