<template>
  <div v-if="customer">
    <h1>{{ customer.title }}</h1>
    <div id="flashMessage" v-if="$store.state.flashMessage">
      {{ $store.state.flashMessage }}
    </div>
    <nav>
      <router-link :to="{ name: `CustomerDetails` }">Details</router-link>
      |
      <router-link :to="{ name: `CustomerRegister` }">Register</router-link>
      |
      <router-link :to="{ name: `CustomerEdit` }">Edit</router-link>
    </nav>
    <router-view :customer="customer" />
  </div>
</template>

<script>

export default {
  props: ["id"],

  created(){
    this.$store.dispatch("fetchOneCustomer", this.id)
    .catch(error => {
      this.$router.push({
        name: "ErrorDisplay",
        params: { error: error },
      })
    })
  },

  computed: {
    customer() {
      return this.$store.state.currentCustomer;
    },
  },
}
</script>

<style>

@keyframes yellowfade {
  from {
    background: yellow;
  }
  to {
    background: transparent;
  }
}

#flashMessage {
  animation-name: yellowfade;
  animation-duration: 4s;
}

</style>