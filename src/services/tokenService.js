/* eslint-disable no-unused-vars */
import injector from 'vue-inject';
export default function TokenService(httpHandlerService, commonExtensions, configReaderService, axios) {
    return {
        async getToken(model) {
            try {
                let config = await configReaderService.getConfiguration();

                //let params = {'HTTP_CONTENT_LANGUAGE': }

                //let scopes = [...model.selectedScopes]
                //console.log(scopes.join(' ') );
                //console.log(model);
                //return;
                let jsonModel = {
                    grant_type: "client_credentials",
                    scope: [...model.selectedScopes].join(' '),
                    client_id: model.clientId,
                    client_secret: model.secret
                };
                //jsonModel.grant_type = "password";



                //console.log(`${config.security.authority}/connect/token`);

                const data = Object.keys(jsonModel)
                    .map((key, index) => `${key}=${encodeURIComponent(jsonModel[key])}`)
                    .join('&');
                

                console.log(jsonModel);
                console.log(data);

                let options = {
                    method: 'POST',
                    headers: { 'content-type': 'application/x-www-form-urlencoded' },
                    url: `${config.security.authority}/connect/token`,
                    data: data
                }
                let request = await axios(options);
   
                return request.data.access_token;
                // eslint-disable-next-line no-unreachable
                // let request = await axios.post(`${config.security.authority}/connect/token`, jsonModel)
                // console.log(request);

            } catch (error) {
                if (error.message.includes("404")) {
                    return {
                        status: false,
                    };
                }
                if (error.response) {
                    return error.response.data.error;
                }
                throw error;
            }


        },
        /*
         var environment = AppEnvironment.Environments.Single(c => c.Environment.Equals(_selectedEnvironmentService.Environment));
                    var identityServerPath = environment.IdentityServer;
                    var tokenEndpoint = $"{identityServerPath}/connect/token";
                    if (identityServerPath.EndsWith("/"))
                    {
                        tokenEndpoint = $"{identityServerPath}connect/token";
                    }
        
                    model.TokenEndpoint = tokenEndpoint;
                    
                    var request = await _tokenRequestService.GetToken(model);
                    return request;
        */
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
        /*
        public async Task<JsonResult> GetToken(TokenRequestModel model)
        {
            var message = new HttpRequestMessage();
            message.Headers.Accept.Clear();
            message.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            if (model.SelectedScopes == null)
            {
                model.SelectedScopes = new List<string>();
            }
            var scopes = string.Join(" ", model.SelectedScopes);

            var content = new FormUrlEncodedContent(new List<KeyValuePair<string, string>>
            {
                new KeyValuePair<string, string>("grant_type", "client_credentials"),
                new KeyValuePair<string, string>("scope", scopes),
                new KeyValuePair<string, string>("client_id", model.ClientId),
                new KeyValuePair<string, string>("client_secret", model.Secret),
            });
            message.Content = content;

            var client = new HttpClient
            {
                BaseAddress = new Uri(model.TokenEndpoint)
            };
            var request = await client.PostAsync("", message.Content);

            var responseContent = await request.Content.ReadAsStringAsync();

            var jobject = JToken.Parse(responseContent);
            if (jobject["error"] != null)
            {
                return new JsonResult(new { Error = jobject["error"].Value<string>() });
            }


            return new JsonResult(JsonConvert.DeserializeObject<TokenResponseModel>(responseContent));


        }
        */
    }
}
injector.service('TokenService', ['HttpHandlerService', 'CommonExtensions', 'ConfigReaderService', 'axios'], TokenService)
