<template>
  <Form
    @submit="onSubmit"
    :validation-schema="apiScopeSchema"
    autocomplete="off"
    ref="myform"
  >
    <div class="d-flex justify-content-between">
      <div class="form-group">
        <label for="name" class="form-label">Name</label>
        <Field
          id="name"
          name="name"
          type="text"
          class="form-control"
          v-model="model.name"
        />
        <ErrorMessage name="name" class="form-text" />
      </div>
      <div class="form-group">
        <label for="displayName" class="form-label">Display Name</label>
        <Field
          id="displayName"
          name="displayName"
          type="text"
          class="form-control"
          v-model="model.displayName"
        />
        <ErrorMessage name="displayName" class="form-text" />
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

    <div class="d-flex justify-content-between my-4">
      <div class="form-check">
        <label for="enabled" class="form-check-label">Enabled</label>
        <Field
          id="enabled"
          name="enabled"
          type="checkbox"
          class="form-check-input"
          :value="true"
          v-model="model.enabled"
          :unchecked-value="false"
        />

        <ErrorMessage name="enabled" class="form-text" />
      </div>
      <div class="form-check">
        <label for="showInDiscoveryDocument" class="form-check-label"
          >Show in Discovery Document</label
        >
        <Field
          id="showInDiscoveryDocument"
          name="showInDiscoveryDocument"
          type="checkbox"
          class="form-check-input"
          :value="true"
          v-model="model.showInDiscoveryDocument"
          :unchecked-value="false"
        />
        <ErrorMessage name="showInDiscoveryDocument" class="form-text" />
      </div>
    </div>
    
    <div class="d-flex justify-content-between my-4">
      <div class="form-check">
        <label for="required" class="form-check-label">Required</label>
        <Field
          id="required"
          name="required"
          type="checkbox"
          class="form-check-input"
          :value="true"
          v-model="model.required"
          :unchecked-value="false"
        />

        <ErrorMessage name="required" class="form-text" />
      </div>
      <div class="form-check">
        <label for="emphasize" class="form-check-label"
          >Emphasize</label
        >
        <Field
          id="emphasize"
          name="emphasize"
          type="checkbox"
          class="form-check-input"
          :value="true"
          v-model="model.emphasize"
          :unchecked-value="false"
        />
        <ErrorMessage name="emphasize" class="form-text" />
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
    "ApiScopesService",
    "ToastService",
    "SpinnerService",
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
      apiScopeId: null,
      emptyModel: {
        enabled: true,
        name: null,
        displayName: null,
        description: null,
        required: false,
        emphasize: false,
        showInDiscoveryDocument: true,
      },
      model: {},
    };
  },
  methods: {
    setProperties() {
      this.apiScopeId = this.$route.params.id;
    },
    async loadModel() {
      if (this.isNew) return;
      try {
        this.SpinnerService.show();
        let apiScopes = await this.ApiScopesService.getApiScope({
          id: this.apiScopeId,
        });
        
        this.model = apiScopes[0];
      } catch (error) {
        this.ToastService.error(error);
      } finally {
        this.SpinnerService.hide();
      }
    },
    validateForm() {
      return this.apiScopeSchema.validate(this.model, { abortEarly: false });
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
        // eslint-disable-next-line no-unreachable
        this.SpinnerService.show();
        values.id = this.apiScopeId;

        await this.ApiScopesService.addUpdateApiScope(values);

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
    apiScopeSchema() {
      return this.ValidationService.apiScopeSchema();
    },
    isNew() {
      return !this.apiScopeId;
    },
    isValid() {
      try {
        this.apiScopeSchema.validateSync(this.model);
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