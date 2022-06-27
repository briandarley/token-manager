/* eslint-disable no-debugger */
import injector from 'vue-inject';
export default function ClientService(httpHandlerService, commonExtensions) {
    return {
        async getClients() {
            try {
                const handler = await httpHandlerService.get();

                let request = await handler.get(`identity-server/clients`);

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
        async getClient(criteria) {
            try {
                const handler = await httpHandlerService.get();

                let queryParams = commonExtensions.convertToQueryParams(criteria);

                let request = await handler.get(`identity-server/clients?${queryParams}`);

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
        async addUpdateClient(model) {
            try {
                const handler = await httpHandlerService.get();

                if (!model.id) {
                    let request = await handler.post(`identity-server/clients`, model);
                    httpHandlerService.clearCache();
                    return request.data;
                }

                let request = await handler.put(`identity-server/clients/${model.id}`, model);
                
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
injector.service('ClientService', ['HttpHandlerService', 'CommonExtensions'], ClientService)
