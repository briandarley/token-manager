<template>
    <div class="container">
        
        <InfoCard level="info" class="mb-5">
            <template #message> 
                <div>
                    <p>A client is a piece of software that requests tokens from IdentityServer - either for 
                       authenticating a user (requesting an identity token) or for accessing a resource
                       (requesting an access token). A client must be first registered with IdentityServer
                       before it can request tokens.</p>
                    <p>Examples for clients are web applications, native mobile or desktop applications,
                        SPAs, server processes etc.</p>


                    List of clients in the <span class="text-uppercase strong">{{environment}}</span> environment. 
                </div>
            </template>
        </InfoCard>
        
        <table class="table table-condensed">
        
            <thead class="thead-primary">
            <tr>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Grant Type</th>
                <th scope="col"></th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            </tbody>
        </table>

        <div class="d-flex justify-content-end align-content-end">
            <button class="btn btn-primary">Add Client</button>
        </div>
    </div>
</template>
<script>
/* eslint-disable no-debugger */

    

    export default {
        dependencies: ["ConfigReaderService"],
                
        async mounted() {
            await this.setEnvironmentVariable();
        },
        data() {
            return {
                environment: "none"
            }
        },
        methods: {
            async setEnvironmentVariable() {
                this.environment = await this.ConfigReaderService.getEnvironment();
            }
        }
        

    }
</script>
<style lang="scss">
</style>