/* eslint-disable no-unused-vars */
import injector from 'vue-inject';
export default function ApiEndpointService(httpHandlerService, commonExtensions) {
    return {
        async getApiEndpoints(criteria) {
            try {
                const handler = await httpHandlerService.get();
                if (criteria) {
                    let queryParams = commonExtensions.convertToQueryParams(criteria);

                    let request = await handler.get(`identity-server/api-endpoints?${queryParams}`);
                    return request.data;
                }
                let request = await handler.get(`identity-server/api-endpoints`);
                
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
        async addUpdateApiEndpoint(model) {
            try {
                const handler = await httpHandlerService.get();

                if (!model.id) {
                    let request = await handler.post("identity-server/api-endpoints", model);
                    httpHandlerService.clearCache();
                    return request.data;
                }

                let request = await handler.put(`identity-server/api-endpoints/${model.id}`, model);

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
        async deleteApiEndpoint(model) {
            try {
                const handler = await httpHandlerService.get();

                let request = await handler.delete(`identity-server/api-endpoints/${model.id}`);
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
    }
}
injector.service('ApiEndpointService', ['HttpHandlerService', 'CommonExtensions'], ApiEndpointService)