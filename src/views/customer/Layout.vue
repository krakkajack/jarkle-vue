<template>
  <div v-if="GStore.customer">
    <h1>{{ GStore.customer.title }}</h1>
    <div id="flashMessage" v-if="GStore.flashMessage">
      {{ GStore.flashMessage }}
    </div>
    <nav>
      <router-link :to="{ name: 'CustomerDetails' }">Details</router-link>
      |
      <router-link :to="{ name: 'CustomerRegister' }">Register</router-link>
      |
      <router-link :to="{ name: 'CustomerEdit' }">Edit</router-link>
    </nav>
    <router-view :customer="GStore.customer" />
  </div>
</template>

<script>

export default {
  inject: ["GStore"],
};
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