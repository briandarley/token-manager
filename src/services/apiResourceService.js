/* eslint-disable no-unused-vars */
import injector from 'vue-inject';
export default function ApiResourceService(httpHandlerService, commonExtensions) {
    return {

        async getApiResources() {
            try {
                const handler = await httpHandlerService.get();

                let request = await handler.get(`identity-server/api-resources`);

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
        async getApiResource(criteria) {
            try {
                const handler = await httpHandlerService.get();

                let queryParams = commonExtensions.convertToQueryParams(criteria);

                let request = await handler.get(`identity-server/api-resources?${queryParams}`);

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
        async addUpdateApiResource(model) {
            try {
                const handler = await httpHandlerService.get();

                if (!model.id) {
                    let request = await handler.post(`identity-server/api-resources`, model);
                    httpHandlerService.clearCache();
                    return request.data;
                }

                let request = await handler.put(`identity-server/api-resources/${model.id}`, model);

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
        async addUpdateApiResourceScope(model) {
            try {
                const handler = await httpHandlerService.get();

                if (!model.id) {
                    let request = await handler.post(`identity-server/api-resources/${model.apiResourceId}/scopes`, model);
                    httpHandlerService.clearCache();
                    return request.data;
                }

                let request = await handler.put(`identity-server/api-resources/${model.apiResourceId}/scopes/${model.id}`, model);

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
        async deleteApiResourceScope(model) {
            try {
                const handler = await httpHandlerService.get();

                let request = await handler.delete(`identity-server/api-resources/${model.apiResourceId}/scopes/${model.id}`);
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
        async addUpdateApiResourceClaim(model) {
            try {
                const handler = await httpHandlerService.get();

                if (!model.id) {
                    let request = await handler.post(`identity-server/api-resources/${model.apiResourceId}/claims`, model);
                    httpHandlerService.clearCache();
                    return request.data;
                }

                let request = await handler.put(`identity-server/api-resources/${model.apiResourceId}/claims/${model.id}`, model);

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
        async deleteApiResourceClaim(model) {
            try {
                const handler = await httpHandlerService.get();

                let request = await handler.delete(`identity-server/api-resources/${model.apiResourceId}/claims/${model.id}`);
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
        async addUpdateApiResourceSecret(model){
            try {
                const handler = await httpHandlerService.get();

                if (!model.id) {
                    let request = await handler.post(`identity-server/api-resources/${model.apiResourceId}/secrets`, model);
                    httpHandlerService.clearCache();
                    return request.data;
                }

                let request = await handler.put(`identity-server/api-resources/${model.apiResourceId}/secrets/${model.id}`, model);

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
        async addUpdateApiResourceProperty(model){
            try {
                const handler = await httpHandlerService.get();

                if (!model.id) {
                    let request = await handler.post(`identity-server/api-resources/${model.apiResourceId}/properties`, model);
                    httpHandlerService.clearCache();
                    return request.data;
                }

                let request = await handler.put(`identity-server/api-resources/${model.apiResourceId}/properties/${model.id}`, model);

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
        async deleteApiResourceSecret(model){
            try {
                const handler = await httpHandlerService.get();

                let request = await handler.delete(`identity-server/api-resources/${model.apiResourceId}/secrets/${model.id}`);
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
        async deleteApiResourceProperty(model) {
            try {
                const handler = await httpHandlerService.get();

                let request = await handler.delete(`identity-server/api-resources/${model.apiResourceId}/properties/${model.id}`);
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
injector.service('ApiResourceService', ['HttpHandlerService', 'CommonExtensions'], ApiResourceService)