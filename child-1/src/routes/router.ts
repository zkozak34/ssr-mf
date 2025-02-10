import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import AboutView from "../views/AboutView.vue";
import HomeView from "../views/HomeView.vue";

const routes: RouteRecordRaw[] = [
	{ path: "/", component: HomeView },
	{ path: "/about", component: AboutView },
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
