<template>
  
  <div>
    <h1>CORS</h1>

    <table class="table table-condensed">
      <thead class="thead-primary">
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Origin</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entity in entities" :key="entity.id">
          <td>{{ entity.id }}</td>
          <td>{{ entity.origin }}</td>
          <td>
            <a href="#" @click.prevent="deleteEntity(entity)">delete</a>
          </td>
        </tr>
      </tbody>
    </table>
    <Form
      @submit="onSubmit"
      :validation-schema="clientCorsSchema"
      autocomplete="off"
      ref="form"
    >
      <div class="card">
        <div class="card-header">Add CORS</div>
        <div class="card-body">
          <div class="d-flex align-content-between">
            <div class="form-group">
              <label for="origin" class="form-label">Origin</label>
              <Field
                id="origin"
                name="origin"
                type="text"
                class="form-control"
                v-model="model.origin"
              />
              <ErrorMessage name="origin" class="form-text" />
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
        origin: "",
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
        
        this.entities = client.allowedCorsOrigins;
      } catch (error) {
        this.ToastService.error(error);
      } finally {
        this.SpinnerService.hide();
      }
    },
    validateForm() {
      return this.clientCorsSchema.validate(this.model, {
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
        await this.ClientService.deleteCorsOrigin(entity);
        await this.loadModel();
        await this.reset();
        this.ToastService.success("Successfully Deleted Origin");
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
        await this.ClientService.addCorsOrigin(values);
        await this.loadModel();
        await this.reset();

        this.ToastService.success("Successfully Added Origin");
      } catch (error) {
        this.ToastService.error(error);
      } finally {
        this.SpinnerService.hide();
      }
    },
  },
  computed: {
    clientCorsSchema() {
      return this.ValidationService.clientCorsSchema();
    },
    isNew() {
      return !this.clientId;
    },
    isValid() {
      
      try {
        this.clientCorsSchema.validateSync(this.model);
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