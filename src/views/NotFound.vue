<template>
  <h1>Oops!</h1>
  <h3>The page you're looking for has gone AWoL</h3>
  <router-link :to="{ name: `CustomerList` }">Back to the home page</router-link>
</template>

<script>

export default {
  props: ["error"],
}

</script>