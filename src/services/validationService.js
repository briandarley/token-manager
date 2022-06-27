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
        }
    }
}
injector.service('ValidationService', ValidationService)
