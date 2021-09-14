// ./src/services/customer-service.js

import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://my-json-server.typicode.com/Code-Pop/Touring-Vue-Router",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

export default {
  getCustomers(perpage, page) {
    return apiClient.get("/events?_limit=" + perpage + "&_page=" + page) // change back to customers
  },

  getCustomer(id) {
    return apiClient.get("/events/" + id) // change back to customers
  },

  postCustomer(cust) { // new post request
    return apiClient.post("/events", cust)
  },

}