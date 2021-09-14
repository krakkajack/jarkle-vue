<template>
  <div class="customers">
    <CustomerCard v-for="cust in customers" :key="cust.id" :customer="cust" />
    <div class="container">
      <router-link id="page-prev"
        :to="{ name: `CustomerList`, query: { page: page - 1 }}"
        rel="prev"
        v-if="page != 1">&#60; Previous
      </router-link>
      <div class="space">
      </div>
      <router-link id="page-next"
        :to="{ name: `CustomerList`, query: { page: page + 1 }}"
        rel="next"
        v-if="hasNextPage">Next &#62;
      </router-link>
    </div>
  </div>
</template>

<script>
//import store from "@/store";
import { watchEffect } from "vue";

import CustomerCard from "@/components/CustomerCard.vue";

export default {
  name: "CustomerList",
  props: ["page"],
  components: {
    CustomerCard,
  },

  created() {
    watchEffect( () => {
      let startFrom = this.page;
      this.$store.dispatch("fetchCustomers", startFrom)
      .catch(error => {
        this.$router.push({
          name: "ErrorDisplay",
          params: { error: error },
        })
      })
    })
  },

  computed: {
    hasNextPage() {
      let totalPages = Math.ceil(this.$store.state.totalCustomers / 2);
      return this.page < totalPages;
    },
    customers() {
      return this.$store.state.customers
    }
  }
};
</script>

<style scoped>
.customers {
  display: flex;
  flex-direction: column;
  align-items:center;
}

.container {
  display:flex;
  align-content: space-between;
  width: 200px;
}

.container a {
  text-decoration: none;
}

.space {
  flex: 1;
}

#page-prev {
  flex: 1;
  text-align: start;
}

#page-next {
  flex: 1;
  text-align: end;
}
</style>
