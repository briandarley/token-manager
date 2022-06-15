import { createApp } from 'vue'
import injector from 'vue-inject';
import App from './App.vue'
import { ConfirmDialog } from './components/dialogs/dialogs';
import InfoCard from './components/info-card/InfoCard.vue';
import IocContainerService from './services/iocContainerService';
import 'jquery/src/jquery.js'
import 'bootstrap/dist/js/bootstrap.min.js'



const iocContainerService = IocContainerService();
iocContainerService.registerServices();
const routerService = injector.get('RouterService');


const app = createApp(App);
app.use(routerService.router);
app.use(injector);
app.component("ConfirmDialog", ConfirmDialog)
app.component("InfoCard", InfoCard)
app.mount('#app');

