/* eslint-disable no-unused-vars */
import * as Services from "./index";
import * as Vendors from './vendor';
//import injector from 'vue-inject';

export default function IocContainerService() {
    return {

        registerServices() {
            // const axios = Vendors.axios;

            // const configReaderService = Services.ConfigReaderService;
            // const localStorageService = Services.LocalStorageService;
            // const routerService = Services.RouterService
            // const userProfileService = Services.UserProfileService;


            // let hash = {};
            // hash['axios'] = function () { return axios };
            // hash['ConfigReaderService'] = configReaderService;
            // hash['LocalStorageService'] = localStorageService;
            // hash['RouterService'] = routerService;
            // hash['UserProfileService'] = userProfileService;


            // for (let dependency in hash) {
            //     injector.service(dependency, hash[dependency]);
            // }
        }
    }
}


