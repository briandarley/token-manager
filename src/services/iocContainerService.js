/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
import * as Services from "./index";
import * as Vendors from './vendor';
import injector from 'vue-inject';

export default function IocContainerService() {
    return {
        async getSecuritySettings() {
            let configReaderService = injector.get('ConfigReaderService');
            return await configReaderService.getConfigurationSetting("security");
        },
        async addConstant(key,value){
            injector.constant(key, value);
        },
        registerServices() {

          
        }
    }
}


