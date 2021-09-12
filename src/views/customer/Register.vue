<template>
  <p>Register for the event here</p>
  <button @click="register">Register</button>
</template>

<script>

export default {
  props: ["customer"],
  inject: ["GStore"],
  methods: {
    register() {
      // If registration API call is successful
      this.GStore.flashMessage = "You are successfully registered for " + this.customer.title
      setTimeout(() => {  // After 3 seconds remove it
        this.GStore.flashMessage = ''
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