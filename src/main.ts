import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from "./plugins/router"
import { VueQueryPlugin } from "@tanstack/vue-query";

createApp(App)
    .use(router)
    .use(vuetify)
    .use(VueQueryPlugin)
    .mount('#app')
