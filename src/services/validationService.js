/* eslint-disable no-unused-vars */
import injector from 'vue-inject';
import * as yup from 'yup';
import isEmailValidator from 'validator/lib/isEmail';
import isNumeric from 'validator/lib/isNumeric';
export default function ValidationService() {
    return {
        emailSchema() {

            return yup.object().shape({
                email: yup.string()
                    .email('Invalid email format')
                    .required('Mail is required')
                    .test("is-valid", (message) => `${message.path} is invalid`,
                        (value) => value ? isEmailValidator(value) : new yup.ValidationError("Invalid value")),
            });
        },
        clientSchema() {
            const nullOrInt = yup
            .number()
            .integer("Must be an integer")
            .typeError("Must be a valid number")
            .min(0, 'Min value is 0.')
            .nullable()
            .transform((value, originalValue) => (String(originalValue).trim() === '' ? null : value));

            return yup.object().shape({


                clientId: yup.string().required('Client Id Required'),
                clientName: yup.string().required('Client Name Required'),
                description: yup.string(),
                clientUri: yup.string(),
                logoUri: yup.string(),
                protocolType: yup.string().required('Protocol Type Required'),
                frontChannelLogoutUri: yup.string(),
                backChannelLogoutUri: yup.string(),
                clientClaimsPrefic: yup.string(),
                pairWiseSubjectSalt: yup.string(),
                userSsoLifetime: yup.string(),
                userCodeType: yup.string(),
                deviceCodeLifetime: nullOrInt,

                accessTokenType: yup.number()
                    .notRequired()   
                    .typeError("Access token type must be numeric")
                    .required("Access token type required"),
                refreshTokenUsage: yup.number()
                    .notRequired()   
                    .typeError("Refresh token usage must be numeric")
                    .required("Refresh token usage required"),
                refreshTokenExpiration: yup.number()
                    
                    .typeError("Refresh token expiration must be numeric")
                    .required("Refresh token expiration required"),
                accessTokenLifetime: yup.number()
                    
                    .positive("Access token lifetime must be positive")
                    .typeError("Access token lifetime must be numeric")
                    .required("Access token lifetime required"),
                slidingRefreshTokenLifetime: yup.number()
                    
                    .positive("Sliding token lifetime must be positive")
                    .typeError("Sliding token lifetime must be numeric")
                    .required("Sliding token lifetime required"),
                absoluteRefreshTokenLifetime: yup.number()
                    
                    .positive("Absolute token lifetime must be positive")
                    .typeError("Absolute token lifetime must be numeric")
                    .required("Absolute token lifetime required"),
                identityTokenLifetime: yup.number()
                    
                    .positive("Identity token lifetime must be positive")
                    .typeError("Identity token lifetime must be numeric")
                    .required("Identity token lifetime required"),
                authorizationCodeLifetime: yup.number()
                    .positive("Authorization code lifetime must be positive")
                    .typeError("Authorization code lifetime must be numeric")
                    .required("Authorization code lifetime required"),
                consentLifetime: nullOrInt,
                enabled: yup.boolean(),
                requiredClientSecret: yup.boolean(),
                requiredConsent: yup.boolean(),
                allowRememberConsent: yup.boolean(),
                enableLocalLogin: yup.boolean(),
                includeJwtId: yup.boolean(),
                alwaysSentClientClaims: yup.boolean(),
                allowAccessTokensViaBrowser: yup.boolean(),
                nonEditable: yup.boolean(),
                allowOfflineAccess: yup.boolean(),
                requirePkce: yup.boolean(),
                allowPlainTextPkce: yup.boolean(),
                frontChannelLogoutSessionRequired: yup.boolean(),
                updateAccessTokenClaimsOnRefresh: yup.boolean(),
                alwaysIncludeUserClaimsInIdToken: yup.boolean(),
                backChannelLogoutSessionRequired: yup.boolean(),



            })
        }
    }
}
injector.service('ValidationService', ValidationService)
