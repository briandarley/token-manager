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
        },
        async addClientSecret(model) {
            try {
                const handler = await httpHandlerService.get();

                let request = await handler.post(`identity-server/clients/${model.clientId}/secrets`, model);
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
        async deleteClientSecret(model) {
            try {
                const handler = await httpHandlerService.get();

                let request = await handler.delete(`identity-server/clients/${model.clientId}/secrets/${model.id}`);
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
        async addClientScope(model) {
            try {
                const handler = await httpHandlerService.get();

                let request = await handler.post(`identity-server/clients/${model.clientId}/scopes`, model);
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
        async deleteClientScope(model) {
            try {
                const handler = await httpHandlerService.get();

                let request = await handler.delete(`identity-server/clients/${model.clientId}/scopes/${model.id}`);
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
        async addCorsOrigin(model) {
            try {
                const handler = await httpHandlerService.get();

                let request = await handler.post(`identity-server/clients/${model.clientId}/cors`, model);
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
        async deleteCorsOrigin(model) {
            try {
                const handler = await httpHandlerService.get();

                let request = await handler.delete(`identity-server/clients/${model.clientId}/cors/${model.id}`);
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
        async addGrantType(model) {
            try {
                const handler = await httpHandlerService.get();

                let request = await handler.post(`identity-server/clients/${model.clientId}/grant-types`, model);
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
        async deleteGrantType(model) {
            try {
                const handler = await httpHandlerService.get();

                let request = await handler.delete(`identity-server/clients/${model.clientId}/grant-types/${model.id}`);
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
        async addRedirectUri(model){
            try {
                const handler = await httpHandlerService.get();

                let request = await handler.post(`identity-server/clients/${model.clientId}/redirect-uris`, model);
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
        async deleteRedirectUri(model) {
            try {
                const handler = await httpHandlerService.get();

                let request = await handler.delete(`identity-server/clients/${model.clientId}/redirect-uris/${model.id}`);
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
        async addClientRestriction(model){
            try {
                const handler = await httpHandlerService.get();

                let request = await handler.post(`identity-server/clients/${model.clientId}/idp-restrictions`, model);
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
        async deleteClientRestriction(model) {
            try {
                const handler = await httpHandlerService.get();

                let request = await handler.delete(`identity-server/clients/${model.clientId}/idp-restrictions/${model.id}`);
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
        async addClientClaim(model) {
            try {
                const handler = await httpHandlerService.get();

                let request = await handler.post(`identity-server/clients/${model.clientId}/claims`, model);
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
        async deleteClientClaim(model) {
            try {
                const handler = await httpHandlerService.get();

                let request = await handler.delete(`identity-server/clients/${model.clientId}/claims/${model.id}`);
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
        async addClientProperty(model) {
            try {
                const handler = await httpHandlerService.get();

                let request = await handler.post(`identity-server/clients/${model.clientId}/properties`, model);
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
        async deleteClientProperty(model) {
            try {
                const handler = await httpHandlerService.get();

                let request = await handler.delete(`identity-server/clients/${model.clientId}/properties/${model.id}`);
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
        //
        
    }
}
injector.service('ClientService', ['HttpHandlerService', 'CommonExtensions'], ClientService)
