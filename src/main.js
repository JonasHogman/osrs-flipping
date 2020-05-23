import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import store from "./store";

Vue.config.productionTip = false;

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({});

Vue.use(VueRouter);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
