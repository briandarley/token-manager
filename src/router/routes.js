/* eslint-disable no-unused-vars */
import HomePage from '../views/HomePage';
import BootstrpLayout from '../views/BootstrapLayout';
import ClientsParentView from '../views/clientsParentView';
import ApiResourceParentView from '../views/apiResourceParentView'
import TokensView from '../views/tokensView';
import ClientTokensView from '../views/tokens/clientTokensView';
import ApiScopesParentView from '../views/apiScopesParentView';
import ApiEndpointsParentView from '../views/apiEndpointsParentView';
import {
    ClientView
    ,ClientEditView
    ,ClientSecretsView
    ,ClientScopesView
    ,ClientRestrictionsView
    ,ClientRedirectsView
    ,ClientPropertiesView
    ,ClientGrantTypesView
    ,ClientCorsView
    ,ClientClaimsView
} from '../views/clientEdit/index';
import {
    ApiScopesView 
    ,ApiScopeEditView
    ,ApiScopeClaimsView
    ,ApiScopePropertiesView 
} from '../views/apiScopes/index';
import {
      ApiResourceView
    , ApiResourceEditView
    , ApiResourceClaimsView
    , ApiResourcePropertiesView
    , ApiResourceScopesView
    , ApiResourceSecretsView
} from '../views/apiResources/index';

import {
    ApiEndpointEditView
    ,ApiEndpointView
} from '../views/apiEndpoints/index';

export const routes = [
    { name: 'home', path: '/', component: HomePage },
    { name: 'bootstrap', path: '/bootstrap', component: BootstrpLayout },
    { name: 'clients', path: '/clients', component: ClientsParentView },
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
                name: 'client.secrets',
                component: ClientSecretsView
            },
            {
                path: 'scopes',
                name: 'client.scopes',
                component: ClientScopesView
            },
            {
                path: 'cors',
                name: 'client.cors',
                component: ClientCorsView
            },
            {
                path: 'grant-types',
                name: 'client.grantTypes',
                component: ClientGrantTypesView
            },
            {
                path: 'redirects',
                name: 'client.redirects',
                component: ClientRedirectsView
            },
            {
                path: 'claims',
                name: 'client.claims',
                component: ClientClaimsView
            },
            {
                path: 'properties',
                name: 'client.properties',
                component: ClientPropertiesView
            },
            {
                path: 'restrictions',
                name: 'client.restrictions',
                component: ClientRestrictionsView 
            }
        ]
    },
    
    { name: 'api-resources', path: '/api-resources', component: ApiResourceParentView },
    {
        props:true,
        name: 'api-resource', 
        path: '/api-resource/:id?', 
        component: ApiResourceView,
        redirect: {
            name: 'api-resource.edit'
        },
        children: [
            {
                alias: '',
                path: '',
                name: 'api-resource.edit',
                component: ApiResourceEditView
            },
            {
                path: 'secrets',
                name: 'api-resource.secrets',
                component: ApiResourceSecretsView
            },
            {
                path: 'scopes',
                name: 'api-resource.scopes',
                component: ApiResourceScopesView
            },
            {
                path: 'claims',
                name: 'api-resource.claims',
                component: ApiResourceClaimsView
            },
            {
                path: 'properties',
                name: 'api-resource.properties',
                component: ApiResourcePropertiesView
            }
        ]
    },
    {name: 'api-scopes', path: '/api-scopes', component: ApiScopesParentView },
    {
        props:true,
        name: 'api-scope', 
        path: '/api-scope/:id?', 
        component: ApiScopesView,
        redirect: {
            name: 'api-scope.edit'
        },
        children: [
            {
                alias: '',
                path: '',
                name: 'api-scope.edit',
                component: ApiScopeEditView
            },
            {
                path: 'claims',
                name: 'api-scope.claims',
                component: ApiScopeClaimsView
            },
            {
                path: 'properties',
                name: 'api-scope.properties',
                component: ApiScopePropertiesView
            }
            
        ]
    },
    { name: 'tokens', path: '/tokens', component: ClientTokensView  },
    { name: 'api-endpoints', path: '/api-endpoints', component: ApiEndpointsParentView },
    {
        props: true,
        name: 'api-endpoint', 
        path: '/api-endpoint/:id?', 
        component: ApiEndpointView,
        redirect: {
            name: 'api-endpoint.edit'
        },
        children: [
            {
                alias: '',
                path: '',
                name: 'api-endpoint.edit',
                component: ApiEndpointEditView
            }
        ]
    }
];
