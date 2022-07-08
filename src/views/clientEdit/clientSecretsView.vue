<template>
  
  <div>
    <h1>Client Secrets</h1>

    <table class="table table-condensed">
      <thead class="thead-primary">
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Description</th>
          <th scope="col">Created</th>
          <th scope="col">Expiration</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entity in entities" :key="entity.id">
          <td>{{ entity.id }}</td>
          <td>{{ entity.description }}</td>
          <td>{{ formatDateTime(entity.created) }}</td>
          <td>{{ entity.expiration }}</td>
          <td>
            <a href="#" @click.prevent="deleteEntity(entity)">delete</a>
          </td>
        </tr>
      </tbody>
    </table>
    <Form
      @submit="onSubmit"
      :validation-schema="clientSecretsSchema"
      autocomplete="off"
      ref="form"
    >
      <div class="card">
        <div class="card-header">Add Client Secret</div>
        <div class="card-body">
          <div class="d-flex align-content-between">
            <div class="form-group">
              <label for="value" class="form-label">Secret</label>
              <Field
                id="value"
                name="value"
                type="password"
                class="form-control"
                v-model="model.value"
              />
              <ErrorMessage name="value" class="form-text" />
            </div>
            <div class="form-group confirm-secret">
              <label for="confirmSecret" class="form-label"
                >Confirm Secret</label
              >
              <Field
                id="confirmSecret"
                name="confirmSecret"
                type="password"
                class="form-control"
                v-model="model.confirmSecret"
              />
              <ErrorMessage name="confirmSecret" class="form-text" />
            </div>
            <DatePicker
              class="flex-fill"
              name="expiration"
              label="Expiration"
              v-model="model.expiration"
            ></DatePicker>
          </div>
          <div class="d-flex align-content-between">
            <div class="form-group flex-fill">
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

            
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-end submit-button">
        
        <button class="btn btn-primary" type="submit" :disabled="!isValid">
          Add Secret
        </button>
        <button class="btn btn-secondary" type="button" @click="reset">
          Reset
        </button>
      </div>
    </Form>
  </div>
</template>
<script>
//https://codesandbox.io/s/custom-text-input-with-vee-validate-v4-forked-vvkzhy?file=/src/components/TextInput.vue:233-243
/* eslint-disable no-unused-vars */
/* eslint-disable no-unreachable */
import "bootstrap-datepicker";


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
      entities: [],
      emptyModel: {
        description: "",
        value: "",
        confirmSecret: null,
        expiration: "01/01/1970",
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
        this.entities = client.clientSecrets;
      } catch (error) {
        this.ToastService.error(error);
      } finally {
        this.SpinnerService.hide();
      }
    },
    validateForm() {
      return this.clientSecretsSchema.validate(this.model, {
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
        await this.ClientService.deleteClientSecret(entity);
        await this.loadModel();
        await this.reset();
        this.ToastService.success("Successfully Deleted Secret");
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
        await this.ClientService.addClientSecret(values);
        await this.loadModel();
        await this.reset();

        this.ToastService.success("Successfully Added New Secret");
      } catch (error) {
        this.ToastService.error(error);
      } finally {
        this.SpinnerService.hide();
      }
    },
  },
  computed: {
    formatDateTime() {
      return value=> {
        return this.SharedFunctions.formatDateTime(value);
      }
    },
    clientSecretsSchema() {
      return this.ValidationService.clientSecretsSchema();
    },
    isNew() {
      return !this.clientId;
    },
    isValid() {
      
      try {
        this.clientSecretsSchema.validateSync(this.model);
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