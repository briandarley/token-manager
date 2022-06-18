import HomePage from '../views/HomePage';
import BootstrpLayout from '../views/BootstrapLayout';
import ClientsView from '../views/clientsView';
import ApiResourcesView from '../views/apiResourcesView'
import TokensView from '../views/tokensView';
import ClientEditView from '../views/clientEditView';
export const routes = [
    {name: 'home', path: '/', component: HomePage},
    {name: 'bootstrap', path: '/bootstrap', component: BootstrpLayout},
    {name: 'clients', path: '/clients', component: ClientsView},
    {name: 'client-edit', path: '/client/:id', component: ClientEditView},
    {name: 'api-resources', path: '/api-resources', component: ApiResourcesView},
    {name: 'tokens', path: '/tokens', component: TokensView},
    
];
