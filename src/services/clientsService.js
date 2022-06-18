import injector from 'vue-inject';
export default function ClientsService() {
    return {
        async getClients() {
            return [
                {
                    id:0,
                    name: "self-service-client",
                    grantTypes: ['implicit']

                },
                {
                    id:1,
                    name: "INTERNAL_API",
                    grantTypes: ['client_credentials']

                },
                {
                    id:2,
                    name: "mvc",
                    grantTypes: ['authorization_code']

                },
                {
                    id:3,
                    name: "PHISHING_API",
                    grantTypes: ['client_credentials']

                }
            ]
        }
    }
}
injector.service('ClientsService', ClientsService)
