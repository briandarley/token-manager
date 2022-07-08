<template>
  
  <div>
    <h1>Client Grant Types</h1>

    <table class="table table-condensed">
      <thead class="thead-primary">
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Grant Type</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entity in entities" :key="entity.id">
          <td>{{ entity.id }}</td>
          <td>{{ entity.grantType }}</td>
          <td>
            <a href="#" @click.prevent="deleteEntity(entity)">delete</a>
          </td>
        </tr>
      </tbody>
    </table>
    <Form
      @submit="onSubmit"
      :validation-schema="clientGrantTypeSchema"
      autocomplete="off"
      ref="form"
    >
      <div class="card">
        <div class="card-header">Add Grant Type</div>
        <div class="card-body">
          <div class="d-flex align-content-between">
            <div class="form-group">
              <label for="grantType" class="form-label">Grant Type</label>
              <Field
                id="grantType"
                name="grantType"
                class="form-select"
                as="select"
                v-model="model.grantType"
              >
              
                <option value="implicit">implicit</option>
                <option value="authorization_code">authorization_code</option>
                <option value="client_credentials">client_credentials</option>
                <option value="hybrid">hybrid</option>
                <option value="password">password</option>
                <option value="urn:ietf:params:oauth:grant-type:device_code">device_code</option>
                
              </Field>
              <ErrorMessage name="grantType" class="form-text" />
            </div>
            
          </div>
          
        </div>
      </div>
      <div class="d-flex justify-content-end submit-button">
        
        <button class="btn btn-primary" type="submit" :disabled="!isValid">
          Add Grant Type
        </button>
        <button class="btn btn-secondary" type="button" @click="reset">
          Reset
        </button>
      </div>
    </Form>
  </div>
</template>
<script>

import "bootstrap-datepicker";


export default {
  dependencies: [
    "ValidationService",
    "ClientService",
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
      clientId: null,
      entities: [],
      emptyModel: {
        grantType: "",
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
        
        this.entities = client.allowedGrantTypes;
      } catch (error) {
        this.ToastService.error(error);
      } finally {
        this.SpinnerService.hide();
      }
    },
    validateForm() {
      return this.clientGrantTypeSchema.validate(this.model, {
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
        await this.ClientService.deleteGrantType(entity);
        await this.loadModel();
        await this.reset();
        this.ToastService.success("Successfully Deleted Grant Type");
      } catch (error) {
        this.ToastService.error(error);
      } finally {
        this.SpinnerService.hide();
      }
    },
    async onSubmit(values) {
      
      try {
        this.SpinnerService.show();
        values.clientId = this.clientId;
        await this.ClientService.addGrantType(values);
        await this.loadModel();
        await this.reset();

        this.ToastService.success("Successfully Added Grant Type");
      } catch (error) {
        this.ToastService.error(error);
      } finally {
        this.SpinnerService.hide();
      }
    },
  },
  computed: {
    clientGrantTypeSchema() {
      return this.ValidationService.clientGrantTypeSchema();
    },
    isNew() {
      return !this.clientId;
    },
    isValid() {
      
      // eslint-disable-next-line no-unreachable
      try {
        this.clientGrantTypeSchema.validateSync(this.model);
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