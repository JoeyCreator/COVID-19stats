import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Recovered from "../views/Recovered.vue";
import Confirmed from "../views/Confirmed.vue";
import Deaths from "../views/Deaths.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: Dashboard, name: "Dashboard" },
  { path: "/recovered", component: Recovered, name: "Recovered" },
  { path: "/confirmed", component: Confirmed, name: "Confirmed" },
  { path: "/deaths", component: Deaths, name: "Deaths" }
];

const scrollBehavior = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        x: 0,
        y: 0
      });
    }, 500);
  });
};

const router = new VueRouter({
  routes,
  scrollBehavior
});

export default router;
