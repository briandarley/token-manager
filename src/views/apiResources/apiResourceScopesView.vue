<template>
  <div>
    <h1>Api Resource Scopes</h1>

    <table class="table table-condensed">
      <thead class="thead-primary">
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Scope</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entity in entities" :key="entity.id">
          <td>{{ entity.id }}</td>
          <td>{{ entity.scope }}</td>
          <td>
            <a href="#" @click.prevent="deleteEntity(entity)">delete</a>
          </td>
        </tr>
      </tbody>
    </table>
    <Form
      @submit="onSubmit"
      :validation-schema="clientScopesSchema"
      autocomplete="off"
      ref="form"
    >
      <div class="card">
        <div class="card-header">Add Api Resource Scope</div>
        <div class="card-body">
          <div class="d-flex align-content-between">
            <div class="form-group">
              <label for="scope" class="form-label">Scope</label>

              <Field
                id="scope"
                name="scope"
                as="select"
                class="form-select"
                v-model="model.scope"
              >
                <option v-for="item in scopes" :key="item.name" :value="item.name">
                  {{item.name}}
                </option>
              </Field>

              <ErrorMessage name="scope" class="form-text" />
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-end submit-button">
        <button class="btn btn-primary" type="submit" :disabled="!isValid">
          Add API Resource Scope
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
    "ApiResourceService",
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
    await this.loadAvailableScopes();
  },
  data() {
    return {
      apiResourceId: null,
      entities: [],
      scopes: [],
      emptyModel: {
        scope: "",
      },
      model: {},
    };
  },
  methods: {
    setProperties() {
      this.apiResourceId = this.$route.params.id;
    },
    async loadAvailableScopes() {
      try {
        this.SpinnerService.show();

        let scopes = await this.ApiScopesService.getApiScopes();
        
        if(!this.isNew){
          scopes = scopes.filter(c=> !this.entities.some(d=> d.scope == c.name))
        }
      
        this.scopes = scopes;
        
      } catch (error) {
        this.ToastService.error(error);
      } finally {
        this.SpinnerService.hide();
      }
    },
    async loadModel() {
      if (this.isNew) return;
      try {
        this.SpinnerService.show();
        let apiResource = await this.ApiResourceService.getApiResource({
          id: this.apiResourceId,
        });
        apiResource = apiResource[0];

        this.entities = apiResource.apiResourceScopes;
      } catch (error) {
        this.ToastService.error(error);
      } finally {
        this.SpinnerService.hide();
      }
    },
    validateForm() {
      return this.clientScopesSchema.validate(this.model, {
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
        await this.ApiResourceService.deleteApiResourceScope(entity);
        await this.loadModel();
        await this.reset();
        this.ToastService.success("Successfully Deleted Scope");
      } catch (error) {
        this.ToastService.error(error);
      } finally {
        this.SpinnerService.hide();
      }
    },
    async onSubmit(values) {
      try {
        this.SpinnerService.show();
        values.apiResourceId = this.apiResourceId;
        await this.ApiResourceService.addUpdateApiResourceScope(values);
        await this.loadModel();
        await this.reset();

        this.ToastService.success("Successfully Added New Scope");
      } catch (error) {
        this.ToastService.error(error);
      } finally {
        this.SpinnerService.hide();
      }
    },
  },
  computed: {
    clientScopesSchema() {
      return this.ValidationService.clientScopesSchema();
    },
    isNew() {
      return !this.apiResourceId;
    },
    isValid() {
      try {
        this.clientScopesSchema.validateSync(this.model);
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