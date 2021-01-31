import Vue from "vue";
import VueRouter from "vue-router";
import Start from "../components/Start.vue";
import Sequence from "../components/Sequence.vue";
import Sort from "../components/Sort.vue";
import Score from "../components/Score.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "start",
    component: Start
  },
  {
    path: "/sequence",
    name: "sequence",
    component: Sequence
  },
  {
    path: "/sort",
    name: "sort",
    component: Sort
  },
  {
    path: "/score",
    name: "score",
    component: Score
  },
  {
    path: '*',
    redirect: '/'
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
