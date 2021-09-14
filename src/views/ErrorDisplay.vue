<template>
  <h1>Oops!</h1>
  <h3>{{ error }}</h3>
  <router-link :to="{ name: `CustomerList` }">Back to the home page</router-link>
</template>

<script>

export default {
  props: ["error"],
}

</script>
