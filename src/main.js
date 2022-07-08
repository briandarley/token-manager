/* eslint-disable vue/multi-word-component-names */
/* eslint-disable no-debugger */
import { createApp } from 'vue'
import injector from 'vue-inject';
import App from './App.vue'
import { 
    ConfirmDialog, 
    TopNav, 
    InfoCard, 
    SpinnerControl,
    ToastMessage,
    BsTextField,
DatePicker  } from './components/index';
import { Field, Form, ErrorMessage } from 'vee-validate';

import IocContainerService from './services/iocContainerService';
import 'jquery/src/jquery.js'
import 'bootstrap/dist/js/bootstrap.min.js'




const iocContainerService = IocContainerService();
iocContainerService.registerServices();
iocContainerService
    .getSecuritySettings()
    .then(settings => {
        return iocContainerService.addConstant("config.security", settings);
    })
    .then(() => {
        let userProfileService = injector.get('UserProfileService');
        return userProfileService.initialize();
    })
    .then(() => {
        const routerService = injector.get('RouterService');
        const app = createApp(App);
        app.use(routerService.router);
        app.use(injector);
        //app.use(VeeValidate);
        app.component("ConfirmDialog", ConfirmDialog)
        app.component("InfoCard", InfoCard)
        app.component("TopNav", TopNav)
        app.component("Field", Field);
        app.component("Form", Form);
        app.component("ErrorMessage", ErrorMessage);
        app.component("SpinnerControl",SpinnerControl)
        app.component("ToastMessage",ToastMessage)
        app.component("BsTextField",BsTextField)
        app.component("DatePicker", DatePicker)
        app.mount('#app');

    });



