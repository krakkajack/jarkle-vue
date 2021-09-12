<template>
  <div class="customers">
    <CustomerCard v-for="cust in customers" :key="cust.id" :customer="cust" />
    <div class="container">
      <router-link id="page-prev"
        :to="{ name: 'CustomerList', query: { page: page - 1 }}"
        rel="prev"
        v-if="page != 1">&#60; Previous
      </router-link>
      <div class="space">
      </div>
      <router-link id="page-next"
        :to="{ name: 'CustomerList', query: { page: page + 1 }}"
        rel="next"
        v-if="hasNextPage">Next &#62;
      </router-link>
    </div>
  </div>
</template>

<script>
import CustomerService from "@/services/customer-service.js";
import CustomerCard from "@/components/CustomerCard.vue";

export default {
  name: "CustomerList",
  props: ["page"],
  components: {
    CustomerCard,
  },

  data() {
    return {
      customers: null,
      totalCustomers: 0

    }
  },

  beforeRouteEnter(routeTo, routeFrom, next) {
    CustomerService.getCustomers(2, parseInt(routeTo.query.page) || 1)
    .then(response => {
      next(comp => {
        comp.customers = response.data;
        comp.totalCustomers = response.headers["x-total-count"];
      })
    })
    .catch(error => {
      console.log(error);
      next({ name: "NetworkError" })
    })
  },

  beforeRouteUpdate(routeTo) {
    return CustomerService.getCustomers(2, parseInt(routeTo.query.page) || 1)
      .then(response => {
        this.customers = response.data
        this.totalCustomers = response.headers['x-total-count']
      })
      .catch(() => {
        return { name: 'NetworkError' }
      })
  },

  computed: {
    hasNextPage() {
      let totalPages = Math.ceil(this.totalCustomers / 2);
      return this.page < totalPages;
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
