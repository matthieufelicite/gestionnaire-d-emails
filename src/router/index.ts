import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import EmailDetail from "@/pages/EmailDetail.vue";

const routes = [
  { path: "/", name: "Login", component: LoginPage },
  {
    path: "/home",
    name: "Home",
    component: HomePage,
    meta: { requiresAuth: true },
  },
  {
    path: "/email/:id",
    name: "EmailDetail",
    component: EmailDetail,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;
  if (to.meta.requiresAuth && !user) {
    next({ name: "Login" });
  } else if (to.name === "Login" && user) {
    next({ name: "Home" });
  } else {
    next();
  }
});

export default router;
