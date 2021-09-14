<template>
<h1>Create a Customer</h1>

<div class="form-container">

  <form @submit.prevent="onSubmit">
    <label>Select a category: </label>
    <select v-model="customer.category">
      <option
        v-for="option in categories"
        :value="option"
        :key="option"
        :selected="option === customer.category"
      >{{ option }}</option>
    </select>

    <h3>Name the customer</h3>

    <label>Title</label>
    <input
      v-model="customer.title"
      type="text"
      placeholder="Title"
    >

    <label>Description</label>
    <input
      v-model="customer.description"
      type="text"
      placeholder="Description"
    />

    <h3>Where is your customer?</h3>

    <label>Location</label>
    <input
      v-model="customer.location"
      type="text"
      placeholder="Location"
    />

    <h3>When is your customer?</h3>
    <label>Date</label>
    <input
      v-model="customer.date"
      type="text"
      placeholder="Date"
    />

    <label>Time</label>
    <input
      v-model="customer.time"
      type="text"
      placeholder="Time"
    />

    <button type="submit">Submit</button>
  </form>

</div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";

export default {
  data () {
    return {
      categories: [
        "sustainability",
        "nature",
        "animal welfare",
        "housing",
        "education",
        "food",
        "community"
      ],
      customer: {
        id: "",
        category: "",
        title: "",
        description: "",
        location: "",
        date: "",
        time: "",
        organiser: ""
      }
    }
  },
  methods: {
    onSubmit() {
      const cust = {
        ...this.customer,
        id: uuidv4(),
        organiser: this.$store.state.user
      }
      console.log("Customer:", cust);

      this.$store.dispatch("createCustomer", cust)
      .then( () => {
        this.$router.push({
          name: "CustomerDetails",
          params: { id: cust.id }
        })
      })
      .catch(error => {
        this.$router.push({
          name: "ErrorDisplay",
          params: { error: error },
        })
      })
    }
  }
}
</script>