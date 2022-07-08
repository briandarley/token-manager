/* eslint-disable no-unused-vars */
import injector from 'vue-inject';
var Base64 = {

    // private property
    _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    // public method for encoding
    encode : function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        input = Base64._utf8_encode(input);

        while (i < input.length) {

            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output +
            this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
            this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
        }
        return output;
    },

    // public method for decoding
    decode : function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        input = input.replace(/[^A-Za-z0-9+/=]/g, "");

        while (i < input.length) {

            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }

        output = Base64._utf8_decode(output);

        return output;
    },

    // private method for UTF-8 encoding
    _utf8_encode : function (string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    },

    // private method for UTF-8 decoding
    _utf8_decode : function (utftext) {
        var string = "";
        var i = 0;
        
        let c = 0;
        let c2 = 0
        let c3 = 0;
        while ( i < utftext.length ) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i+1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i+1);
                c3 = utftext.charCodeAt(i+2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
}

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

                console.log(jsonModel);
                console.log(jsonModel.client_secret);

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
