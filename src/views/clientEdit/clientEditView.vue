<template>
  <Form
    @submit="onSubmit"
    :validation-schema="clientSchema"
    autocomplete="off"
    ref="myform"
  >
    <div class="d-flex justify-content-between">
      <div class="form-group">
        <label for="clientId" class="form-label">Client Id</label>
        <Field
          id="clientId"
          name="clientId"
          type="text"
          class="form-control"
          v-model="model.clientId"
        />
        <ErrorMessage name="clientId" class="form-text" />
      </div>
      <div class="form-group">
        <label for="clientName" class="form-label">Client Name</label>
        <Field
          id="clientName"
          name="clientName"
          type="text"
          class="form-control"
          v-model="model.clientName"
        />
        <ErrorMessage name="clientName" class="form-text" />
      </div>
    </div>

    <div class="form-group">
      <label for="description" class="form-label">Description</label>
      <Field
        id="description"
        name="description"
        type="text"
        class="form-control"
        v-model="model.description"
      />
      <ErrorMessage name="description" class="form-text" />
    </div>

    <div class="d-flex justify-content-between">
      <div class="form-group">
        <label for="clientUri" class="form-label">Client Uri</label>
        <Field
          id="clientUri"
          name="clientUri"
          type="text"
          class="form-control"
          v-model="model.clientUri"
        />
        <ErrorMessage name="clientUri" class="form-text" />
      </div>
      <div class="form-group">
        <label for="logoUri" class="form-label">Logo Uri</label>
        <Field
          id="logoUri"
          name="logoUri"
          type="text"
          class="form-control"
          v-model="model.logoUri"
        />
        <ErrorMessage name="logoUri" class="form-text" />
      </div>
    </div>

    <div class="d-flex justify-content-between">
      <div class="form-group">
        <label for="protocolType" class="form-label">Protocol Type</label>
        <Field
          id="protocolType"
          name="protocolType"
          type="text"
          class="form-control"
          v-model="model.protocolType"
        />
        <ErrorMessage name="protocolType" class="form-text" />
      </div>
      <div class="form-group">
        <label for="frontChannelLogoutUri" class="form-label"
          >Front Channel Logout Uri</label
        >
        <Field
          id="frontChannelLogoutUri"
          name="frontChannelLogoutUri"
          type="text"
          class="form-control"
          v-model="model.frontChannelLogoutUri"
        />
        <ErrorMessage name="frontChannelLogoutUri" class="form-text" />
      </div>
      <div class="form-group">
        <label for="backChannelLogoutUri" class="form-label"
          >Back Channel Logout Uri</label
        >
        <Field
          id="backChannelLogoutUri"
          name="backChannelLogoutUri"
          type="text"
          class="form-control"
          v-model="model.backChannelLogoutUri"
        />
        <ErrorMessage name="backChannelLogoutUri" class="form-text" />
      </div>
    </div>

    <div class="d-flex justify-content-between">
      <div class="form-group">
        <label for="clientClaimsPrefix" class="form-label"
          >Client Claims Prefix</label
        >
        <Field
          id="clientClaimsPrefix"
          name="clientClaimsPrefix"
          type="text"
          class="form-control"
          v-model="model.clientClaimsPrefix"
        />
        <ErrorMessage name="clientClaimsPrefix" class="form-text" />
      </div>
      <div class="form-group">
        <label for="pairWiseSubjectSalt" class="form-label"
          >Pair Wise Subject Salt</label
        >
        <Field
          id="pairWiseSubjectSalt"
          name="pairWiseSubjectSalt"
          type="text"
          class="form-control"
          v-model="model.pairWiseSubjectSalt"
        />
        <ErrorMessage name="pairWiseSubjectSalt" class="form-text" />
      </div>
      <div class="form-group">
        <label for="userSsoLifetime" class="form-label"
          >User SSO Lifetime</label
        >
        <Field
          id="userSsoLifetime"
          name="userSsoLifetime"
          type="text"
          class="form-control"
          v-model="model.userSsoLifetime"
        />
        <ErrorMessage name="userSsoLifeTime" class="form-text" />
      </div>
    </div>

    <div class="d-flex justify-content-between">
      <div class="form-group">
        <label for="userCodeType" class="form-label">User Code Type</label>
        <Field
          id="userCodeType"
          name="userCodeType"
          type="text"
          class="form-control"
          v-model="model.userCodeType"
        />
        <ErrorMessage name="userCodeType" class="form-text" />
      </div>
      <div class="form-group">
        <label for="deviceCodeLifetime" class="form-label"
          >Device Code Lifetime</label
        >
        <Field
          id="deviceCodeLifetime"
          name="deviceCodeLifetime"
          type="text"
          class="form-control"
          v-model="model.deviceCodeLifetime"
        />
        <ErrorMessage name="deviceCodeLifetime" class="form-text" />
      </div>
      <div class="form-group">
        <label for="accessTokenType" class="form-label"
          >Access Token Type</label
        >
        <Field
          id="accessTokenType"
          name="accessTokenType"
          as="select"
          class="form-select"
          v-model="model.accessTokenType"
        >
          <option value="0">Jwt</option>
          <option value="1">Reference</option>
        </Field>
        <ErrorMessage name="accessTokenType" class="form-text" />
      </div>
    </div>
    <div class="d-flex justify-content-between">
      <div class="form-group">
        <label for="refreshTokenUsage" class="form-label"
          >Refresh Token Usage</label
        >
        <Field
          id="refreshTokenUsage"
          name="refreshTokenUsage"
          as="select"
          class="form-select"
          v-model="model.refreshTokenUsage"
        >
          <option value="0">Reuse</option>
          <option value="1">OneTimeOnly</option>
        </Field>
        <ErrorMessage name="refreshTokenUsage" class="form-text" />
      </div>
      <div class="form-group">
        <label for="refreshTokenExpiration" class="form-label"
          >Refresh Token Expiration</label
        >
        <Field
          id="refreshTokenExpiration"
          name="refreshTokenExpiration"
          as="select"
          class="form-select"
          v-model="model.refreshTokenExpiration"
        >
          <option value="0">Sliding</option>
          <option value="1">Absolute</option>
        </Field>
        <ErrorMessage name="refreshTokenExpiration" class="form-text" />
      </div>
    </div>
    <div class="d-flex justify-content-between audit-fields">
      <div>
        <span>Created</span> <span>{{ formatDate(model.created) }}</span>
      </div>
      <div>
        <span>Updated</span> <span>{{ formatDate(model.updated) }}</span>
      </div>
      <span>Last Accessed</span> <span>{{ formatDate(model.lastAccessed) }}</span>
    </div>

    <div class="d-flex justify-content-between">
      <div class="form-group">
        <label for="accessTokenLifetime" class="form-label"
          >Access Token Lifetime (seconds)</label
        >
        <Field
          id="accessTokenLifetime"
          name="accessTokenLifetime"
          type="text"
          class="form-control"
          v-model="model.accessTokenLifetime"
        />
        <ErrorMessage name="accessTokenLifetime" class="form-text" />
      </div>
      <div class="form-group">
        <label for="slidingRefreshTokenLifetime" class="form-label"
          >Sliding Refresh Token Lifetime (seconds)</label
        >
        <Field
          id="slidingRefreshTokenLifetime"
          name="slidingRefreshTokenLifetime"
          type="text"
          class="form-control"
          v-model="model.slidingRefreshTokenLifetime"
        />
        <ErrorMessage name="slidingRefreshTokenLifetime" class="form-text" />
      </div>
      <div class="form-group">
        <label for="absoluteRefreshTokenLifetime" class="form-label"
          >Absolute Refresh Token Lifetime (seconds)</label
        >
        <Field
          id="absoluteRefreshTokenLifetime"
          name="absoluteRefreshTokenLifetime"
          type="text"
          class="form-control"
          v-model="model.absoluteRefreshTokenLifetime"
        />
        <ErrorMessage name="absoluteRefreshTokenLifetime" class="form-text" />
      </div>
    </div>
    <div class="d-flex justify-content-between">
      <div class="form-group">
        <label for="identityTokenLifetime" class="form-label"
          >Identity Token Lifetime (seconds)</label
        >
        <Field
          id="identityTokenLifetime"
          name="identityTokenLifetime"
          type="text"
          class="form-control"
          v-model="model.identityTokenLifetime"
        />
        <ErrorMessage name="identityTokenLifetime" class="form-text" />
      </div>
      <div class="form-group">
        <label for="authorizationCodeLifetime" class="form-label"
          >Authorization Code Lifetime (seconds)</label
        >
        <Field
          id="authorizationCodeLifetime"
          name="authorizationCodeLifetime"
          type="text"
          class="form-control"
          v-model="model.authorizationCodeLifetime"
        />
        <ErrorMessage name="authorizationCodeLifetime" class="form-text" />
      </div>
      <div class="form-group">
        <label for="consentLifetime" class="form-label"
          >Consent Lifetime (seconds)</label
        >
        <Field
          id="consentLifetime"
          name="consentLifetime"
          type="text"
          class="form-control"
          v-model="model.consentLifetime"
        />

        <ErrorMessage name="consentLifetime" class="form-text" />
      </div>
    </div>

    <div class="d-flex justify-content-between checkbox-selection">
      <div class="form-check">
        <label for="enabled" class="form-check-label">Enabled</label>
        <Field
          id="enabled"
          name="enabled"
          type="checkbox"
          class="form-check-input"
          :value="true"
          :unchecked-value="false"
          v-model="model.enabled"
        />

        <ErrorMessage name="enabled" class="form-text" />
      </div>
      <div class="form-check">
        <label for="requireClientSecret" class="form-check-label"
          >Require Client Secret</label
        >
        <Field
          id="requireClientSecret"
          name="requireClientSecret"
          type="checkbox"
          class="form-check-input"
          :value="true"
          :unchecked-value="false"
          v-model="model.requireClientSecret"
        />
        <ErrorMessage name="requireClientSecret" class="form-text" />
      </div>
      <div class="form-check">
        <label for="requireConsent" class="form-check-label"
          >Require Consent</label
        >
        <Field
          id="requireConsent"
          name="requireConsent"
          type="checkbox"
          class="form-check-input"
          :value="true"
          :unchecked-value="false"
          v-model="model.requireConsent"
        />
        <ErrorMessage name="requireConsent" class="form-text" />
      </div>
      <div class="form-check">
        <label for="allowRememberConsent" class="form-check-label"
          >Allow Remember Consent</label
        >
        <Field
          id="allowRememberConsent"
          name="allowRememberConsent"
          type="checkbox"
          class="form-check-input"
          :value="true"
          :unchecked-value="false"
          v-model="model.allowRememberConsent"
        />
        <ErrorMessage name="allowRememberConsent" class="form-text" />
      </div>
    </div>

    <div class="d-flex justify-content-between checkbox-selection">
      <div class="form-check">
        <label for="enableLocalLogin" class="form-check-label"
          >Enable Local Login</label
        >
        <Field
          id="enableLocalLogin"
          name="enableLocalLogin"
          type="checkbox"
          class="form-check-input"
          :value="true"
          :unchecked-value="false"
          v-model="model.enableLocalLogin"
        />
        <ErrorMessage name="enableLocalLogin" class="form-text" />
      </div>
      <div class="form-check">
        <label for="includeJwtId" class="form-check-label"
          >Include JWT Id</label
        >
        <Field
          id="includeJwtId"
          name="includeJwtId"
          type="checkbox"
          class="form-check-input"
          :value="true"
          :unchecked-value="false"
          v-model="model.includeJwtId"
        />
        <ErrorMessage name="includeJwtId" class="form-text" />
      </div>
      <div class="form-check">
        <label for="alwaysSendClientClaims" class="form-check-label"
          >Always Send Client Claims</label
        >
        <Field
          id="alwaysSendClientClaims"
          name="alwaysSendClientClaims"
          type="checkbox"
          class="form-check-input"
          :value="true"
          :unchecked-value="false"
          v-model="model.alwaysSendClientClaims"
        />
        <ErrorMessage name="alwaysSendClientClaims" class="form-text" />
      </div>
      <div class="form-check">
        <label for="allowAccessTokensViaBrowser" class="form-check-label"
          >Allow Access Tokens Via Browser</label
        >
        <Field
          id="allowAccessTokensViaBrowser"
          name="allowAccessTokensViaBrowser"
          type="checkbox"
          class="form-check-input"
          :value="true"
          :unchecked-value="false"
          v-model="model.allowAccessTokensViaBrowser"
        />
        <ErrorMessage name="allowAccessTokensViaBrowser" class="form-text" />
      </div>
    </div>
    <div class="d-flex justify-content-between checkbox-selection">
      <div class="form-check">
        <label for="nonEditable" class="form-check-label">Non-Editable</label>
        <Field
          id="nonEditable"
          name="nonEditable"
          type="checkbox"
          class="form-check-input"
          :value="true"
          :unchecked-value="false"
          v-model="model.nonEditable"
        />
        <ErrorMessage name="nonEditable" class="form-text" />
      </div>
      <div class="form-check">
        <label for="allowOfflineAccess" class="form-check-label"
          >Allow Offline Access</label
        >
        <Field
          id="allowOfflineAccess"
          name="allowOfflineAccess"
          type="checkbox"
          class="form-check-input"
          :value="true"
          :unchecked-value="false"
          v-model="model.allowOfflineAccess"
        />
        <ErrorMessage name="allowOfflineAccess" class="form-text" />
      </div>
      <div class="form-check">
        <label for="requirePkce" class="form-check-label">Require Pkce</label>
        <Field
          id="requirePkce"
          name="requirePkce"
          type="checkbox"
          class="form-check-input"
          :value="true"
          :unchecked-value="false"
          v-model="model.requirePkce"
        />
        <ErrorMessage name="requirePkce" class="form-text" />
      </div>
      <div class="form-check">
        <label for="allowPlainTextPkce" class="form-check-label"
          >Allow Plain Text Pkce</label
        >
        <Field
          id="allowPlainTextPkce"
          name="allowPlainTextPkce"
          type="checkbox"
          class="form-check-input"
          :value="true"
          :unchecked-value="false"
          v-model="model.allowPlainTextPkce"
        />
        <ErrorMessage name="allowPlainTextPkce" class="form-text" />
      </div>
    </div>
    <div class="d-flex justify-content-between checkbox-selection">
      <div class="form-check">
        <label for="frontChannelLogoutSessionRequired" class="form-check-label"
          >Front Channel Logout Session Required</label
        >
        <Field
          id="frontChannelLogoutSessionRequired"
          name="frontChannelLogoutSessionRequired"
          type="checkbox"
          class="form-check-input"
          :value="true"
          :unchecked-value="false"
          v-model="model.frontChannelLogoutSessionRequired"
        />
        <ErrorMessage
          name="frontChannelLogoutSessionRequired"
          class="form-text"
        />
      </div>
      <div class="form-check">
        <label for="updateAccessTokenClaimsOnRefresh" class="form-check-label"
          >Update Access Token Claims on Refresh</label
        >
        <Field
          id="updateAccessTokenClaimsOnRefresh"
          name="updateAccessTokenClaimsOnRefresh"
          type="checkbox"
          class="form-check-input"
          :value="true"
          :unchecked-value="false"
          v-model="model.updateAccessTokenClaimsOnRefresh"
        />
        <ErrorMessage
          name="updateAccessTokenClaimsOnRefresh"
          class="form-text"
        />
      </div>
    </div>
    <div class="d-flex justify-content-between checkbox-selection">
      <div class="form-check">
        <label for="alwaysIncludeUserClaimsInIdToken" class="form-check-label"
          >Always Include User Claims In Id Token</label
        >
        <Field
          id="alwaysIncludeUserClaimsInIdToken"
          name="alwaysIncludeUserClaimsInIdToken"
          type="checkbox"
          class="form-check-input"
          :value="true"
          :unchecked-value="false"
          v-model="model.alwaysIncludeUserClaimsInIdToken"
        />
        <ErrorMessage
          name="alwaysIncludeUserClaimsInIdToken"
          class="form-text"
        />
      </div>
      <div class="form-check">
        <label for="backChannelLogoutSessionRequired" class="form-check-label"
          >Back Channel Logout Session Required</label
        >
        <Field
          id="backChannelLogoutSessionRequired"
          name="backChannelLogoutSessionRequired"
          type="checkbox"
          class="form-check-input"
          :value="true"
          :unchecked-value="false"
          v-model="model.backChannelLogoutSessionRequired"
        />
        <ErrorMessage
          name="backChannelLogoutSessionRequired"
          class="form-text"
        />
      </div>
    </div>
    <div class="d-flex justify-content-end submit-button">
      <button class="btn btn-primary" type="submit" :disabled="!isValid">
        Save
      </button>
      <button class="btn btn-secondary" type="button" @click="reset">
        Reset
      </button>
    </div>
  </Form>
</template>
<script>
export default {
  dependencies: [
    "ValidationService",
    "ClientService",
    "ToastService",
    "SpinnerService",
    "SharedFunctions"
  ],
  created() {
    this.model = JSON.parse(JSON.stringify(this.emptyModel));
  },
  async mounted() {
    this.setProperties();

    await this.loadModel();
  },
  data() {
    return {
      clientId: null,
      emptyModel: {
        created: "",
        updated: "",
        lastAccessed: "",
        requireClientSecret: true,
        allowRememberConsent: true,
        requireConsent: false,
        enabled: true,
        enableLocalLogin: true,
        includeJwtId: false,
        alwaysSendClientClaims: false,
        allowAccessTokensViaBrowser: true,
        nonEditable: false,
        allowOfflineAccess: true,
        requirePkce: false,
        allowPlainTextPkce: false,
        frontChannelLogoutSessionRequired: true,
        updateAccessTokenClaimsOnRefresh: true,
        alwaysIncludeUserClaimsInIdToken: false,
        backChannelLogoutSessionRequired: true,

        protocolType: "oidc",
        clientId: null,
        clientName: null,
        description: null,
        clientUri: null,
        logoUri: null,
        frontChannelLogoutUri: null,
        backChannelLogoutUri: null,
        identityTokenLifetime: 300,
        deviceCodeLifetime: 300,
        accessTokenLifetime: 28800,
        authorizationCodeLifetime: 300,
        consentLifetime: 0,
        absoluteRefreshTokenLifetime: 2592000,
        slidingRefreshTokenLifetime: 1296000,
        refreshTokenUsage: 1, //OneTimeOnly
        refreshTokenExpiration: 1, //Absolute
        accessTokenType: 0, //jwt
        clientClaimsPrefix: "client_",
        pairWiseSubjectSalt: null,
        userSsoLifetime: null,
        userCodeType: null,

        //requireRequestObject: false,
      },
      model: {},
    };
  },
  methods: {
    setProperties() {
      this.clientId = this.$route.params.id;
    },
    async loadModel() {
      if (this.isNew) return;
      try {
        this.SpinnerService.show();
        let client = await this.ClientService.getClient({ id: this.clientId });
        client = client[0];
        this.model = client;
      } catch (error) {
        this.ToastService.error(error);
      } finally {
        this.SpinnerService.hide();
      }
    },
    validateForm() {
      return this.clientSchema.validate(this.model, { abortEarly: false });
    },
    async reset() {
      if (this.isNew) {
        this.model = JSON.parse(JSON.stringify(this.emptyModel));
      } else {
        await this.loadModel();
      }
    },
    
    
    async onSubmit(values) {
      
      try {
        this.SpinnerService.show();
        
        // eslint-disable-next-line no-unreachable
        values.id = this.clientId;

        await this.ClientService.addUpdateClient(values);

        await this.loadModel();
        
        this.ToastService.success("Successfully Saved");
      } catch (error) {
        this.ToastService.error(error);
      } finally {
        this.SpinnerService.hide();
      }
    },
  },
  computed: {
    formatDate() {
      return value=> {
        return this.SharedFunctions.formatDate(value);
      }
    },
    clientSchema() {
      return this.ValidationService.clientSchema();
    },
    isNew() {
      return !this.clientId;
    },
    isValid() {
      try {
        this.clientSchema.validateSync(this.model);
        return true;
      } catch {
        //ignore
      }
      return false;
    },
  },
};
</script>
<style lang="scss" scoped>
.form-group {
  width: 100%;
  margin-right: 10px;
  justify-self: flex-end;
  align-self: flex-start;
  &:last-of-type {
    margin-right: 0;
  }
}
.audit-fields {
  margin: 20px 0;
  padding: 20px 0;
  border-top: 1px solid $secondary;
  border-bottom: 1px solid $secondary;
}
.checkbox-selection {
  margin-top: 20px;
  padding: 20px 0 5px;
  border-top: 1px solid $secondary;
}
.submit-button {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid $secondary;
  .btn {
    margin-right: 10px;
  }
  .btn:last-of-type {
    margin: 0;
  }
}
[role="alert"] {
  color: $red;
}
</style>