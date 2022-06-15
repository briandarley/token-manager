import axios  from 'axios';
import injector from 'vue-inject';
import * as Oidc from "oidc-client";

injector.constant('axios', axios);
injector.constant('Oidc',Oidc);
