<template>
  <p>{{ customer.time }} on {{ customer.date }} @ {{ customer.location }}</p>
  <p>{{ customer.description }}</p>
</template>

<script>

export default {
  props: ["customer"],
}
</script>

<style>

</style>