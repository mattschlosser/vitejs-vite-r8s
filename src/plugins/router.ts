import { createRouter, createWebHistory } from "vue-router"

export default createRouter({
    routes: [
        {
            path: "/",
            component: () => import("../pages/Home.vue")
        },
        {
            path: "/login",
            component: () => import("../pages/Login.vue")
        },
        {
            path: "/register",
            component: () => import("../pages/Register.vue")
        },
        {
            path: "/households",
            component: () => import("../pages/Households/Households.vue")
        },
        {
            path: "/households/:id",
            component: () => import("../pages/Households/HouseholdDetails.vue")
        }
    ],
    history: createWebHistory()
})