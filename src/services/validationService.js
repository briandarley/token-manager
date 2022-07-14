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

            //const requiredString = yup.string().typeError('Required Field')
            const stringFields = [
                "clientId"
                , "clientName"
                , "protocolType"
                , "clientClaimsPrefix"
            ];
            const numberFields = [
                 "accessTokenLifetime"
                , "slidingRefreshTokenLifetime"
                , "absoluteRefreshTokenLifetime"
               , "identityTokenLifetime"
                , "authorizationCodeLifetime"

            ];
            const nullOrIntFields = [
                "deviceCodeLifetime"
                ,"accessTokenType"
                ,"refreshTokenUsage"
                ,"refreshTokenExpiration"
                ,"consentLifetime"
            ]

            let validationObject = {
                description: yup.string().nullable(true).trim(),
                clientUri: yup.string().nullable(true).trim(),
                logoUri: yup.string().nullable(true).trim(),
                frontChannelLogoutUri: yup.string().nullable(true).trim(),
                backChannelLogoutUri: yup.string().nullable(true).trim(),
                pairWiseSubjectSalt: yup.string().nullable(true).trim(),
                userSsoLifetime: nullOrInt,
                userCodeType: yup.string().nullable(true).trim().notRequired(),
                

                
                
                enabled: yup.boolean(),
                requireClientSecret: yup.boolean(),
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
            };
            function getCaseName(field) {
                return `${field
                    .replace(/([a-z])([A-Z])/g, '$1 $2')
                    .replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
                }`;
            }
            stringFields.forEach(item => {
                let caseFieldName = getCaseName(item);
                validationObject[item] = yup.string()
                    .typeError(`${caseFieldName} is a required field`)
                    .required(`${caseFieldName} is a required field`)
            });
            numberFields.forEach(item => {
                let caseFieldName = getCaseName(item);
                validationObject[item] = yup.number()
                .positive(`${caseFieldName} must be positive`)
                .typeError(`${caseFieldName} must be numeric`)
                .required(`${caseFieldName} is required`)
            })
            nullOrIntFields.forEach(item => {
                let caseFieldName = getCaseName(item);
                validationObject[item] = yup.number()
                .integer(`${caseFieldName} must be an integer value`)
                .typeError(`${caseFieldName} must be numeric`)
                .min(0, 'Min value is 0.')
                .nullable()
                .transform((value, originalValue) => (String(originalValue).trim() === '' ? null : value));
            })
            
            
            return yup.object().shape(validationObject)
        },
        clientSecretsSchema() {
            let validationObject = {
                value: yup.string().required('Secret is required'),
                confirmSecret: yup.string()
                   .oneOf([yup.ref('value'), null], 'Secrets must match'),
                descriptions: yup.string().nullable(true).trim(),
                expiration: yup.string()
            }            
            return yup.object().shape(validationObject)
        },
        clientScopesSchema() {
            let validationObject = {
                scope: yup.string().trim().required('Scope is required')
                
            }            
            return yup.object().shape(validationObject)
        },
        clientCorsSchema() {
            let validationObject = {
                origin: yup.string().trim().required('Origin is required')
                
            }            
            return yup.object().shape(validationObject)
        },
        clientGrantTypeSchema() {
            let validationObject = {
                grantType: yup.string().trim().required('Grant type is required')
                
            }            
            return yup.object().shape(validationObject)
        },
        clientRedirectUriSchema() {
            let validationObject = {
                redirectUri: yup.string().trim().required('Uri is required')
                
            }            
            return yup.object().shape(validationObject)
        },
        clientRestrictionsSchema() {
            let validationObject = {
                provider: yup.string().trim().required('Provider is required')
                
            }            
            return yup.object().shape(validationObject)
        },
        clientClaimsSchema() {
            let validationObject = {
                type: yup.string().trim().required('Type is required'),
                value: yup.string().trim().required('Value is required')
                
            }            
            return yup.object().shape(validationObject)
        },
        clientPropertiesSchema() {
            let validationObject = {
                key: yup.string().trim().required('Key is required'),
                value: yup.string().trim().required('Value is required')
                
            }            
            return yup.object().shape(validationObject)
        },
        apiResourceSchema() {
            let validationObject = {
                enabled: yup.boolean(),
                name: yup.string().trim().required('Name is required'),
                displayName: yup.string().trim().nullable(),
                description: yup.string().trim().nullable(),
                showInDiscoveryDocument: yup.boolean(),
                allowedAccessTokenSigningAlgorithms: yup.string().nullable(),
            }            
            return yup.object().shape(validationObject)
        },
        apiScopeSchema() {
            let validationObject = {
                name: yup.string().trim().required('Name is required'),
                displayName: yup.string().trim().nullable(),
                description: yup.string().trim().nullable(),
                required: yup.boolean(),
                emphasize: yup.boolean(),
                showInDiscoveryDocument: yup.boolean(),
                enabled: yup.boolean(),

            }            
            return yup.object().shape(validationObject)
        },
        apiScopeClaimsSchema() {
            let validationObject = {
                type: yup.string().trim().required('Type is required'),
                
                
            }            
            return yup.object().shape(validationObject)
        },
        apiEndpointSchema() {
            let validationObject = {
                name: yup.string().trim().required('Name is required'),
                description: yup.string().nullable(true).trim(),
                notes: yup.string().nullable(true).trim(),
                environment: yup.string().trim().required('Environment is required'),
                uri: yup.string().required('Uri is required')

                
                
            }            
            return yup.object().shape(validationObject)
        }
    }
}
injector.service('ValidationService', ValidationService)
