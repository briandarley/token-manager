/* eslint-disable no-debugger */
import injector from 'vue-inject';
import wrapper from '../services/cacher/index';
export default function HttpHandlerService(axios, ConfigReaderService, UserProfileService) {
    return {
        _httpHandler: null,
        async get() {
            if(this._httpHandler) return this._httpHandler;
            const serviceEndpoint = await ConfigReaderService.getConfigurationSetting("serviceEndpoint")

            const user = await UserProfileService.getUser();

            if (user == null || user.expired) {
                return null;
            }

            const instance = wrapper(axios.create({

                baseURL: serviceEndpoint,
                headers: {
                    "Authorization": `Bearer ${user.access_token}`,
                    "Content-Type": "application/json"
                },

            }), {
                maxCachSize: 15,
                ttl: 60000
            });
            
            instance.__addFilter(/clients/)
            //instance.__addFilter(/clients\?id=[0-9]/)
            this._httpHandler = instance;



            return this._httpHandler;
        },
        clearCache() {
            if(!this._httpHandler) return;
            this._httpHandler.__clearCache();

        }
    }
}
injector.service('HttpHandlerService', ['axios', 'ConfigReaderService', 'UserProfileService'], HttpHandlerService)
