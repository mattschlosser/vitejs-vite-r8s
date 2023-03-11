import { createRouter, createWebHistory } from "vue-router"
import { watch } from "vue";
import { useAuth } from "../hooks/useAuth";

const { hasLoggedIn } = useAuth();

const router = createRouter({
    routes: [
        {
            path: "/",
            component: () => import("../pages/Home.vue")
        },
        {
            path: "/login",
            name: "login",
            component: () => import("../pages/Login.vue")
        },
        {
            path: "/register",
            component: () => import("../pages/Register.vue")
        },
        {
            path: "/households",
            meta: {
                auth: true
            },
            component: () => import("../pages/Households/Households.vue")
        },
        {
            path: "/households/:id",
            meta: {
                auth: true
            },
            component: () => import("../pages/Households/HouseholdDetails.vue"),
            props: true
        },
        {
            path: "/households/:id/receipts",
            meta: {
                auth: true
            },
            component: () => import("../pages/Households/Receipts.vue"),
            props: true
        }
    ],
    history: createWebHistory(),
});

watch(hasLoggedIn, () => {
    if (hasLoggedIn.value === false) {
        if (router.currentRoute.value.meta.auth) {
            router.push({name: 'login'})
        }
    }
})

export default router;