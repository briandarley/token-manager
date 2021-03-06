<template>
  <div>
    <h1>Client Restrictions</h1>

    <table class="table table-condensed">
      <thead class="thead-primary">
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Provider</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entity in entities" :key="entity.id">
          <td>{{ entity.id }}</td>
          <td>{{ entity.provider }}</td>
          <td>
            <a href="#" @click.prevent="deleteEntity(entity)">delete</a>
          </td>
        </tr>
      </tbody>
    </table>
    <Form
      @submit="onSubmit"
      :validation-schema="clientRestrictionsSchema"
      autocomplete="off"
      ref="form"
    >
      <div class="card">
        <div class="card-header">Add Client Restriction</div>
        <div class="card-body">
          <div class="d-flex align-content-between">
            <div class="form-group">
              <label for="provider" class="form-label"
                >Client Idp Restrictions</label
              >
              <Field
                id="provider"
                name="provider"
                class="form-select"
                as="select"
                v-model="model.provider"
              >
                <option value="google">Google</option>
                <option value="microsoft">Microsoft</option>
                <option value="microsoft">Instagram</option>
                <option value="aws">Amazon Web Service</option>
                <option value="facebook">Facebook</option>
              </Field>
              <ErrorMessage name="provider" class="form-text" />
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-end submit-button">
        <button class="btn btn-primary" type="submit" :disabled="!isValid">
          Add Client Idp Restriction
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
        provider: "",
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

        this.entities = client.identityProviderRestrictions;
      } catch (error) {
        this.ToastService.error(error);
      } finally {
        this.SpinnerService.hide();
      }
    },
    validateForm() {
      return this.clientRestrictionsSchema.validate(this.model, {
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
        await this.ClientService.deleteClientRestriction(entity);
        await this.loadModel();
        await this.reset();
        this.ToastService.success("Successfully Deleted Provider");
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
        await this.ClientService.addClientRestriction(values);
        await this.loadModel();
        await this.reset();

        this.ToastService.success("Successfully Added Provider");
      } catch (error) {
        this.ToastService.error(error);
      } finally {
        this.SpinnerService.hide();
      }
    },
  },
  computed: {
    clientRestrictionsSchema() {
      return this.ValidationService.clientRestrictionsSchema();
    },
    isNew() {
      return !this.clientId;
    },
    isValid() {
      // eslint-disable-next-line no-unreachable
      try {
        this.clientRestrictionsSchema.validateSync(this.model);
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