<template>
  <button class="btn btn-outline" @click="signOut">Se déconnecter</button>
</template>

<script>
export default {
  methods: {
    signOut() {
      localStorage.removeItem("user");
      this.$router.push({ name: "Login" });
    },
  },
};
</script>
