/* eslint-disable no-unused-vars */
import HomePage from '../views/HomePage';
import BootstrpLayout from '../views/BootstrapLayout';
import ClientsView from '../views/clientsView';
import ApiResourcesView from '../views/apiResourcesView'
import TokensView from '../views/tokensView';
import ClientView from '../views/clientEdit/clientView';
import ClientEditView from '../views/clientEdit/clientEditView';
import ClientSecretsView from '../views/clientEdit/clientSecretsView';
import ClientScopesView from '../views/clientEdit/clientScopesView';
import ClientCorsView from '../views/clientEdit/clientCorsView';
import ClientGrantTypesView from '../views/clientEdit/clientGrantTypesView';
import ClientRedirectsView from '../views/clientEdit/clientRedirectsView';
import ClientClaimsView from '../views/clientEdit/clientClaimsView';
import ClientPropertiesView from '../views/clientEdit/clientPropertiesView';
import ClientRestrictionsView from '../views/clientEdit/clientRestrictionsView';
export const routes = [
    { name: 'home', path: '/', component: HomePage },
    { name: 'bootstrap', path: '/bootstrap', component: BootstrpLayout },
    { name: 'clients', path: '/clients', component: ClientsView },
    {
        props:true,
        name: 'client', 
        path: '/client/:id?', 
        component: ClientView,
        redirect: {
            name: 'client.edit'
        },
        children: [
            {
                alias: '',
                path: '',
                name: 'client.edit',
                component: ClientEditView
            },
            {
                path: 'secrets',
                component: ClientSecretsView
            },
            {
                path: 'scopes',
                component: ClientScopesView
            },
            {
                path: 'cors',
                component: ClientCorsView
            },
            {
                path: 'grant-types',
                component: ClientGrantTypesView
            },
            {
                path: 'redirects',
                component: ClientRedirectsView
            },
            {
                path: 'claims',
                component: ClientClaimsView
            },
            {
                path: 'properties',
                component: ClientPropertiesView
            },
            {
                path: 'restrictions',
                component: ClientRestrictionsView 
            }
        ]
    },

    // {
    //     name: 'client-edit', path: '/client/:id?', component: ClientEditView
    // },
    //{ name: 'client-secrets', path: '/client/:id/secrets', component: ClientSecretsView },
    //{ name: 'client-scopes', path: '/client/:id/scopes', component: ClientScopesView },
    //{ name: 'client-cors', path: '/client/:id/cors', component: ClientCorsView },
    //{ name: 'client-grant-types', path: '/client/:id/grant-types', component: ClientGrantTypesView },
    //{ name: 'client-redirects', path: '/client/:id/redirects', component: ClientRedirectsView },
    //{ name: 'client-claims', path: '/client/:id/claims', component: ClientClaimsView },
    //{ name: 'client-properties', path: '/client/:id/properties', component: ClientPropertiesView },
    { name: 'api-resources', path: '/api-resources', component: ApiResourcesView },
    { name: 'tokens', path: '/tokens', component: TokensView },

];
