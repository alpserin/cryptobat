import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue"
import Signup from "../components/Signup.vue"
import Login from "../components/Login.vue"

const routes = [
    {path: "/", component: Home},
    {path: "/login", component: Login},
    {path: "/signup", component: Signup}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router