/* eslint-disable no-debugger */
import injector from 'vue-inject';

export default function ConfigReaderService(axios) {
    return {
        configuration: null,

        async getEnvironment() {
            let configuration = await this._getConfiguration(); 
            
            const environment = configuration.data.environment;

            return environment;
        },
        async _getConfiguration() {
            if (!this.configuration) {
                this.configuration = await axios.get(`${window.location.origin}/configuration.json`);
            }
            return this.configuration;
        },
        async getConfiguration() {
            let configuration = await this._getConfiguration(); 
            
            const environment = configuration.data.environment;

            if (environment !== "local") {
                if (window.location.protocol !== "https:") {
                    location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
                }
            }
            let oidcSettings = {};
            let response = {};

            response = Object.assign(response, configuration.data);

            switch (environment) {
                case "local":
                    oidcSettings = await axios.get(`${window.location.origin}/oidc.config.local.json`);
                    break;
                case "test":
                    oidcSettings = await axios.get(`${window.location.origin}/oidc.config.test.json`);
                    break;
                case "uat":
                    oidcSettings = await axios.get(`${window.location.origin}/oidc.config.uat.json`);
                    break;
                case "production":
                    oidcSettings = await axios.get(`${window.location.origin}/oidc.config.production.json`);
                    break;
                default:
                    throw "Environment not found or not supported";

            }

            response = Object.assign(response, oidcSettings.data);
            return response;

        },
        async getConfigurationSetting(key) {
            const config = await this.getConfiguration();
            return config[key];
        }
    }
}
injector.service('ConfigReaderService', ['axios'], ConfigReaderService);