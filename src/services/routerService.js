/* eslint-disable no-unused-vars */
import { createRouter, createWebHistory,createWebHashHistory } from 'vue-router'
import { routes } from '../router/routes';
import injector from 'vue-inject';

export default function RouterService() {
    return {
        get router() {
            if (this._router) this._router;

            this._router = createRouter({
                history: createWebHistory(process.env.BASE_URL),
                routes
            });

            return this._router;
        },
        _router: null
     
    }
}


injector.service('RouterService', RouterService);
