<template>
  <router-link
    class="event-link"
    :to="{ name: 'CustomerDetails', params: {id: customer.id}}">
    <div class="customer-card">
      <h4>{{ customer.title }}</h4>
      <span>{{ customer.date }}</span>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    customer: {
      type: Object,
      required: true
    }
  },
};
</script>

<style scoped>
.customer-card {
  padding: 10px;
  width: 200px;
  cursor: pointer;
  border: 1px solid darkslateblue;
  border-radius: 5% / 20%;
  margin-bottom: 18px;
}

.customer-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}

.event-link {
  text-decoration: none;
}

</style>
