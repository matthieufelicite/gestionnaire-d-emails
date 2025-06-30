<template>
  <div>
    <button v-if="!user" class="btn btn-primary" @click="signIn">
      Sign in with Microsoft
    </button>
    <button v-else class="btn btn-secondary" @click="signOut">Sign out</button>
  </div>
</template>

<script>
import { signInAndGetUser } from "@/libs/microsoftGraph";

export default {
  data() {
    return {
      user: null,
    };
  },
  mounted() {
    // Check if user is already in localStorage
    const user = localStorage.getItem("user");
    if (user) {
      this.user = JSON.parse(user);
    }
  },
  methods: {
    async signIn() {
      const user = await signInAndGetUser();
      this.user = user;
      localStorage.setItem("user", JSON.stringify(user));
      this.$emit("signed-in", user);
      this.$router.push({ name: "Home" });
    },
    signOut() {
      this.user = null;
      localStorage.removeItem("user");
      this.$router.push({ name: "Login" });
    },
  },
};
</script>
