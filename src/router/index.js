// .src/router/index.js

import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";

import CustomerList from "@/views//customer/List.vue";
import CustomerCreate from "@/views/customer/Create.vue";
import CustomerLayout from "@/views/customer/Layout.vue";
import CustomerDetails from "@/views/customer/Details.vue";
import CustomerRegister from "@/views/customer/Register.vue";
import CustomerEdit from "@/views/customer/Edit.vue";
import About from "@/views/About.vue";
import ErrorDisplay from "@/views/ErrorDisplay.vue";
import NotFound from "@/views/NotFound.vue";
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
        meta: { requireAuth: false }
      },
    ],
  },
  
  {
      path: "/customerCreate",
      name: "CustomerCreate",
      component: CustomerCreate
  },
  

  // Optional re-direct code in case of misspelling etc
  // {
  //   path: "/customers/:afterCustomers(.*)",
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
    path: "/error/:error",
    name: "ErrorDisplay",
    props: true,
    component: ErrorDisplay,
  },
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
    store.dispatch("setMessage", "Sorry, not authorised");
    setTimeout( () => {
      store.dispatch("setMessage", "");
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
