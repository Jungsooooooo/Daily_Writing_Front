import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "./components/views/HomeView.vue";
import ToWrite from "./components/views/ToWrite.vue";
import SearchView from "./components/views/SearchView.vue";
import DetailView from "./components/views/DetailView.vue";
import UpdateView from "./components/views/UpdateView.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      component: HomeView,
    },
    { path: "/write", component: ToWrite },
    { path: "/search", component: SearchView },
    { path: "/detail", component: DetailView },
    { path: "/update", component: UpdateView },
  ],
});

export default router;
