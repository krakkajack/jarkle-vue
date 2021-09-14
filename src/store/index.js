import { createStore } from "vuex";

import CustomerService from "@/services/customer-service.js";

export default createStore({
  state: {
    flashMessage: "",
    customers: [],
    currentCustomer: {},
    howMany: 2,
    totalCustomers: 0,
    user: "me",
  },
  mutations: {
    SET_MESSAGE(state, message) {
      state.flashMessage = message
    },
    
    SET_CUSTOMERS(state, customers) {
      state.customers = customers
    },

    SET_CURRENT_CUSTOMER(state, customer) {
      state.currentCustomer = customer
    },

    SET_TOTAL(state, total) {
      state.totalCustomers = total
    },

    ADD_CUSTOMER(state, customer) {
      state.customers.push(customer);
      state.totalCustomers += 1;
    },
  }, // mutations

  actions: {
    fetchCustomers({ commit, state }, startFrom) {
      return CustomerService.getCustomers(state.howMany, startFrom)
      .then(response => {
        commit("SET_CUSTOMERS", response.data);
        commit("SET_TOTAL", response.headers["x-total-count"])
      })
      .catch(error => {
        console.log(error);
        throw(error);
      })
    },

    fetchOneCustomer({ commit, state }, id) {
      const existingCustomer = state.customers.find((cust) => cust.id == id);
      if ( existingCustomer ) {
        commit("SET_CURRENT_CUSTOMER", existingCustomer);
      } else {
        return CustomerService.getCustomer(id)
        .then(response => {
          commit("SET_CURRENT_CUSTOMER", response.data)
        })
        .catch(error => {
          console.log(error);
          throw(error);
        })
      }
    },

    createCustomer({ commit }, cust) {
      CustomerService.postCustomer(cust)
      .then ( () => {
        commit("ADD_CUST", cust)
      })
      .catch ( error => {
        console.log(error);
        throw(error);
      });
    },

    setMessage({ commit }, message) {
      commit("SET_MESSAGE", message);
    }
  }, // actions
  modules: {},
});

