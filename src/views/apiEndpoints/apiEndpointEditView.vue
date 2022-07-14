<template>

  
    <Form
    @submit="onSubmit"
    :validation-schema="apiEndpointSchema"
    autocomplete="off"
    
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
    <div class="form-group">
      <label for="environment" class="form-label">Environment</label>
      <Field 
        id="environment" 
        name="environment" 
        as="select" 
        class="form-select" 
        v-model="model.environment" 
        >
         <option value="test">Test</option>
         <option value="uat">UAT</option>
         <option value="production">Production</option>
         <option value="local">Local</option>
      </Field>
      <ErrorMessage name="environment" class="form-text"/>
    </div>


    <div class="form-group">
      <label for="notes" class="form-label">Notes</label>
      <Field
        id="notes"
        name="notes"
        type="text"
        class="form-control"
        v-model="model.notes"
      />
      <ErrorMessage name="notes" class="form-text" />
    </div>
    <div class="form-group">
      <label for="uri" class="form-label">Uri</label>
      <Field
        id="uri"
        name="uri"
        type="text"
        class="form-control"
        v-model="model.uri"
      />
      <ErrorMessage name="uri" class="form-text" />
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
  props: ['name'],
  dependencies: [
    "ValidationService",
    "ApiEndpointService",
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
      
      apiEndpointId: null,
      emptyModel: {
        name: null,
        description: null,
        notes: null,
        uri: null,
        environment: null
      },
      model: {
         name: null,
        description: null,
        notes: null,
        uri: null,
        environment: null
      },
    };
  },
  methods: {
    setProperties() {
      this.apiEndpointId = this.$route.params.id;
    },
    async loadModel() {
      if (this.isNew) return;
      try {
        this.SpinnerService.show();
        let entity = await this.ApiEndpointService.getApiEndpoints({
          id: this.apiEndpointId,
        });
        entity = entity[0];
        this.model = entity;
      } catch (error) {
        this.ToastService.error(error);
      } finally {
        this.SpinnerService.hide();
      }
    },
    validateForm() {
      return this.apiEndpointSchema.validate(this.model, { abortEarly: false });
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
        values.id = this.apiEndpointId;

        await this.ApiEndpointService.addUpdateApiEndpoint(values);

        await this.loadModel();

        this.ToastService.success("Successfully Saved");

        
        this.$router.push({name: 'api-endpoints'})
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
    apiEndpointSchema() {
      return this.ValidationService.apiEndpointSchema();
    },
    isNew() {
      return !this.apiEndpointId;
    },
    isValid() {
      try {
        this.apiEndpointSchema.validateSync(this.model);
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