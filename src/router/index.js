// .src/router/index.js

import { createRouter, createWebHistory } from "vue-router";
import GStore from "@/store";

import CustomerService from "@/services/customer-service";
import CustomerList from "@/views/CustomerList.vue";
import CustomerLayout from "@/views/customer/Layout.vue";
import CustomerDetails from "@/views/customer/Details.vue";
import CustomerRegister from "@/views/customer/Register.vue";
import CustomerEdit from "@/views/customer/Edit.vue";
import About from "@/views/About.vue";
import NotFound from "@/views/NotFound.vue";
import NetworkError from "@/views/NetworkError.vue";
import NProgress from "nprogress";

const routes = [
  {
    path: "/",
    name: "CustomerList",
    component: CustomerList,
    props: route => ({ page: parseInt(route.query.page) || 1})
  },

  {
    path: "/customer/:id",
    name: "CustomerLayout",
    props: true,
    component: CustomerLayout,
    beforeEnter: to => {
      return CustomerService.getCustomer(to.params.id)
      .then((response) => {
        GStore.customer = response.data;
      })
      .catch((error) => {
        if (error.response && error.response.status == 404) {
          return {
            name: "404Resource",
            params: { resource: "customer"}
          }
        } else {
          return { name: "NetworkError" }
        }
      })
    },
    children: [
      {
        path: "",
        name: "CustomerDetails",
        component: CustomerDetails
      },
      {
        path: "register",
        name: "CustomerRegister",
        component: CustomerRegister,
      },
      
      {
        path: "edit",
        name: "CustomerEdit",
        component: CustomerEdit,
        meta: { requireAuth: true }
      },
    ]
  },

  // Optional re-direct code in case of misspelling etc
  // {
  //   path: '/customers/:afterCustomers(.*)',
  //   redirect: to => {
  //     return { path: "/customer/" = to.params.afterCustomers }
  //   }
  // },

  {
    path: "/about",
    name: "About",
    component: About
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () =>
    //  import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },

  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound
  },

  {
    path: "/404/:resource",
    name: "404Resource",
    component: NotFound,
    props: true
  },

  {
    path: "/network-error",
    name: "NetworkError",
    component: NetworkError
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) { // <----
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
});

router.beforeEach((to, from) => {
  NProgress.start();

  const notAuthorised = true;
  if (to.meta.requireAuth && notAuthorised) {
    GStore.flashMessage = "Sorry, not authorised";
    setTimeout( () => {
      GStore.flashMessage = "";
    }, 3000);
    if (from.href) {
      return false
    } else {
      return { path: "/" }
    }
  }

})

router.afterEach(() => {
  NProgress.done()
})

export default router;
