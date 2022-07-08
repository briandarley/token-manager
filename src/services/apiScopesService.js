/* eslint-disable no-unused-vars */
import injector from 'vue-inject';
export default function ApiScopesService(httpHandlerService, commonExtensions) {
    return {
        async getApiScopes() {
            try {
                const handler = await httpHandlerService.get();

                let request = await handler.get(`identity-server/api-scopes`);

                return request.data;
            } catch (error) {
                if (error.message.includes("404")) {
                    return {
                        status: false,
                    };
                }
                throw error;
            }
        },
        async getApiScope(criteria) {
            try {
                const handler = await httpHandlerService.get();

                let queryParams = commonExtensions.convertToQueryParams(criteria);

                let request = await handler.get(`identity-server/api-scopes?${queryParams}`);

                return request.data;
            } catch (error) {
                if (error.message.includes("404")) {
                    return {
                        status: false,
                    };
                }
                throw error;
            }
        },
               
        async addUpdateApiScope(model) {
            try {
                const handler = await httpHandlerService.get();

                if (!model.id) {
                    let request = await handler.post(`identity-server/api-scopes`, model);
                    httpHandlerService.clearCache();
                    return request.data;
                }

                let request = await handler.put(`identity-server/api-scopes/${model.id}`, model);

                return request.data;



            }
            catch (error) {

                if (error.message.includes("404"))
                    throw "Not found"
                else if (error.response && error.response.data.message)
                    throw error.response.data.message

                throw error;
            }
        },
        async addUpdateApiScopeClaim(model) {
            try {
                const handler = await httpHandlerService.get();

                if (!model.id) {
                    let request = await handler.post(`identity-server/api-scopes/${model.apiScopeId}/claims`, model);
                    httpHandlerService.clearCache();
                    return request.data;
                }

                let request = await handler.put(`identity-server/api-scopes/${model.apiScopeId}/claims`, model);

                return request.data;



            }
            catch (error) {

                if (error.message.includes("404"))
                    throw "Not found"
                else if (error.response && error.response.data.message)
                    throw error.response.data.message

                throw error;
            }
        },
        async deleteApiScopeClaim(model) {
            try {
                const handler = await httpHandlerService.get();

                let request = await handler.delete(`identity-server/api-scopes/${model.apiScopeId}/claims/${model.id}`);
                httpHandlerService.clearCache();
                return request.data;

            }
            catch (error) {

                if (error.message.includes("404"))
                    throw "Not found"
                else if (error.response && error.response.data.message)
                    throw error.response.data.message

                throw error;
            }
        },
        async addUpdateApiScopeProperty(model) {
            try {
                const handler = await httpHandlerService.get();

                if (!model.id) {
                    let request = await handler.post(`identity-server/api-scopes/${model.apiScopeId}/properties`, model);
                    httpHandlerService.clearCache();
                    return request.data;
                }

                let request = await handler.put(`identity-server/api-scopes/${model.apiScopeId}/properties`, model);

                return request.data;



            }
            catch (error) {

                if (error.message.includes("404"))
                    throw "Not found"
                else if (error.response && error.response.data.message)
                    throw error.response.data.message

                throw error;
            }
        },
        async deleteApiScopeProperty(model) {
            try {
                const handler = await httpHandlerService.get();

                let request = await handler.delete(`identity-server/api-scopes/${model.apiScopeId}/properties/${model.id}`);
                httpHandlerService.clearCache();
                return request.data;

            }
            catch (error) {

                if (error.message.includes("404"))
                    throw "Not found"
                else if (error.response && error.response.data.message)
                    throw error.response.data.message

                throw error;
            }
        }

    }
}
injector.service('ApiScopesService', ['HttpHandlerService', 'CommonExtensions'], ApiScopesService)