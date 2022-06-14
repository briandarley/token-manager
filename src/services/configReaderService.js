import axios from "axios";

export default function ConfigReaderService() {
    return {
        async getEnvironment() {
            var configuration = await axios.get("configuration.json");
            const environment = configuration.data.environment;
            return  environment;
        },
        async getConfiguration() {
            var configuration = await axios.get("configuration.json");
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
                    oidcSettings = await axios.get('oidc.config.local.json');
                    break;
                case "test":
                    oidcSettings = await axios.get('oidc.config.test.json');
                    break;
                case "uat":
                    oidcSettings = await axios.get('oidc.config.uat.json');
                    break;
                case "production":
                    oidcSettings = await axios.get('oidc.config.production.json');
                    break;
                default:
                    throw "Environment not found or not supported";
                    
            }

            response = Object.assign(response, oidcSettings.data);
            return response;

        }
    }
}