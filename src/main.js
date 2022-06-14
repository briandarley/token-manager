import { createApp } from 'vue'
import {createRouter,createWebHashHistory} from 'vue-router';
import App from './App.vue'
import {routes} from './router/routes';
import {ConfirmDialog} from'./components/dialogs/dialogs';
import InfoCard from './components/info-card/InfoCard.vue';
import 'jquery/src/jquery.js'
import 'bootstrap/dist/js/bootstrap.min.js'

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

const app = createApp(App);
    app.use(router);
    app.component("ConfirmDialog", ConfirmDialog)
    app.component("InfoCard",InfoCard)
    app.mount('#app');

