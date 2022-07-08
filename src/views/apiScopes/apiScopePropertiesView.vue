<template>

  <div>
    <h1>Api Scope Properties</h1>

    <table class="table table-condensed">
      <thead class="thead-primary">
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Key</th>
          <th scope="col">Value</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entity in entities" :key="entity.id">
          <td>{{ entity.id }}</td>
          <td>{{ entity.key }}</td>
          <td>{{ entity.value }}</td>
          <td>
            <a href="#" @click.prevent="deleteEntity(entity)">delete</a>
          </td>
        </tr>
      </tbody>
    </table>
    <Form
      @submit="onSubmit"
      :validation-schema="clientPropertiesSchema"
      autocomplete="off"
      ref="form"
    >
      <div class="card">
        <div class="card-header">Add Api Scope Property</div>
        <div class="card-body">
          <div class="d-flex align-content-between">
            <div class="form-group">
              <label for="key" class="form-label">Key</label>
              <Field
                id="key"
                name="key"
                type="text"
                class="form-control"
                v-model="model.key"
              />
              <ErrorMessage name="key" class="form-text" />
            </div>
            <div class="form-group">
              <label for="value" class="form-label">Value</label>
              <Field
                id="value"
                name="value"
                type="text"
                class="form-control"
                v-model="model.value"
              />
              <ErrorMessage name="value" class="form-text" />
            </div>
          </div>
          
        </div>
      </div>
      <div class="d-flex justify-content-end submit-button">
        
        <button class="btn btn-primary" type="submit" :disabled="!isValid">
          Add Api Scope Property
        </button>
        <button class="btn btn-secondary" type="button" @click="reset">
          Reset
        </button>
      </div>
    </Form>
  </div>
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
      entities: [],
      emptyModel: {
        scope: "",
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
        let apiScopes = await this.ApiScopesService.getApiScope({ id: this.apiScopeId });
        apiScopes = apiScopes[0];
        
        this.entities = apiScopes.apiScopeProperties;
      } catch (error) {
        this.ToastService.error(error);
      } finally {
        this.SpinnerService.hide();
      }
    },
    validateForm() {
      return this.clientPropertiesSchema.validate(this.model, {
        abortEarly: false,
      });
    },
    async reset() {
      this.model = JSON.parse(JSON.stringify(this.emptyModel));
      this.$refs.form.resetForm();
    },
    async deleteEntity(entity) {
      try {
        this.SpinnerService.show();
        await this.ApiScopesService.deleteApiScopeProperty(entity);
        await this.loadModel();
        await this.reset();
        this.ToastService.success("Successfully Deleted API Scope Property");
      } catch (error) {
        this.ToastService.error(error);
      } finally {
        this.SpinnerService.hide();
      }
    },
    async onSubmit(values) {
      
      try {
        this.SpinnerService.show();
        values.apiScopeId = this.apiScopeId;
        
        
        // eslint-disable-next-line no-unreachable
        await this.ApiScopesService.addUpdateApiScopeProperty(values);
        await this.loadModel();
        await this.reset();

        this.ToastService.success("Successfully Added New API Scope Property");
      } catch (error) {
        this.ToastService.error(error);
      } finally {
        this.SpinnerService.hide();
      }
    },
  },
  computed: {
    clientPropertiesSchema() {
      return this.ValidationService.clientPropertiesSchema();
    },
    isNew() {
      return !this.apiScopeId;
    },
    isValid() {
      
      try {
        this.clientPropertiesSchema.validateSync(this.model);
        return true;
      } catch {
        //ignore
      }
      return false;
    },
  },
};
</script>
<style lang="scss">
.form-group {
  flex-grow: 1;
  flex-basis: 0;
  margin-right: 10px;

  &:last-of-type {
    margin-right: 0;
  }
}

.submit-button {
  margin-top: 20px;
  padding-top: 20px;

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