<template>
  <p>Register for the event here</p>
  <button @click="register">Register</button>
</template>

<script>

export default {
  props: ["customer"],
  methods: {
    register() {
      // If registration API call is successful
      this.$store.commit("SET_MESSAGE", "You are registered for " + this.customer.title);
      setTimeout(() => {  // After 3 seconds remove it
        this.$store.commit("SET_MESSAGE", "")
      }, 3000)

      this.$router.push({
        name: "CustomerDetails",
      })
    }
  }
}
</script>


<style>

</style>