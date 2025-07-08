<template>
  <button class="btn btn-outline gap-3" @click="signIn">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 23" class="h-5 w-5">
      <path fill="#f3f3f3" d="M0 0h23v23H0z" />
      <path fill="#f35325" d="M1 1h10v10H1z" />
      <path fill="#81bc06" d="M12 1h10v10H12z" />
      <path fill="#05a6f0" d="M1 12h10v10H1z" />
      <path fill="#ffba08" d="M12 12h10v10H12z" />
    </svg>
    Sign in with Microsoft
  </button>
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
  },
};
</script>
