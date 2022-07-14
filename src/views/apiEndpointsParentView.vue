<template>
  <div>
    <h1 class="text-carolina-blue">API Endpoints</h1>
    <InfoCard level="info" class="mb-5">
      <template #message>
        <div>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident
            molestias illum, explicabo inventore accusantium quo repellat culpa
            dicta quae ut veritatis corrupti dolorem maiores quaerat sit velit
            adipisci earum repudiandae.
          </p>
          <p>
            Examples for clients are web applications, native mobile or desktop
            applications, SPAs, server processes etc.
          </p>

          List of API Resources in the
          <span class="text-uppercase strong">{{ environment }}</span>
          environment.
        </div>
      </template>
    </InfoCard>
    <div class="d-flex justify-content-between submit-button">
      <div class="form-group environment-selection">
        <label for="environment">Environment</label>
        <select
          name="environment"
          id="environment"
          class="form-select"
          v-model="selectedEnvironment"
          @change="initialize"
        >
          <option value="Production">Production</option>
          <option value="Test">Test</option>
          <option value="UAT">UAT</option>
          <option value="Local">Local</option>
        </select>
      </div>
      <div class="create-new-api-endpoint d-flex">
        <button
          class="btn btn-primary"
          type="button"
          @click="goToCreateNewApiEndpointView"
        >
          Create New API Endpoint
        </button>
      </div>
    </div>

    <table class="table table-condensed">
      <thead class="thead-primary">
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Name</th>
          <th scope="col">Uri</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr class="filter-controls">
          <td>
            <input
              type="text"
              class="form-control"
              placeholder="id"
              v-model="id"
            />
          </td>
          <td>
            <input
              type="text"
              class="form-control"
              placeholder="name"
              v-model="name"
            />
          </td>
          <td>
            <input
              type="text"
              class="form-control"
              placeholder="uri"
              v-model="uri"
              
            />
          </td>
          <td><input type="text" class="form-control" /></td>
        </tr>
        <tr v-for="entity in entities" :key="entity.id">
          <td>{{ entity.id }}</td>
          <td>{{ entity.name }}</td>
          <td>{{ entity.uri }}</td>
          <td class="links">
            <router-link
              :to="{ name: 'api-endpoint', params: { id: entity.id } }"
              >edit</router-link
            >
            <a href="#" @click="deleteEntity(entity)">delete</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
/* eslint-disable no-debugger */
export default {
  dependencies: [
    "ConfigReaderService",
    "ApiEndpointService",
    "SpinnerService",
    "ToastService",
  ],

  async mounted() {
    await this.initialize();
    this.environment = await this.ConfigReaderService.getEnvironment();
  },
  data() {
    return {
      selectedEnvironment: "Production",
      environment: "none",
      entities: [],
      initialEntities: [],
      id: null,
      name: null,
      uri: null,
    };
  },
  methods: {
    async initialize() {
      try {
        this.SpinnerService.show();
        this.entities = await this.ApiEndpointService.getApiEndpoints();

        this.entities = this.entities.filter(
          (c) =>
            c.environment.toUpperCase() ==
            this.selectedEnvironment.toUpperCase()
        );
        this.initialEntities = this.entities;
      } catch (error) {
        window.console.log(error);
      } finally {
        this.SpinnerService.hide();
      }
    },
    goToCreateNewApiEndpointView() {
      this.$router.push({ name: "api-endpoint" });
    },
    async deleteEntity(entity) {
      try {
        this.SpinnerService.show();
        await this.ApiEndpointService.deleteApiEndpoint(entity);
        this.ToastService.success("Removed Api Enpoint");
        await this.initialize();
      } catch (error) {
        this.ToastService.error(error);
      } finally {
        this.SpinnerService.hide();
      }
    },
    // eslint-disable-next-line no-unused-vars
  },
  watch: {
    id(value) {
      if(value === undefined) return;
      let currentFilterVal = value;
      
      this.entities = JSON.parse(JSON.stringify(this.initialEntities));
      
      this.name = undefined;
      this.uri = undefined;
      if(!currentFilterVal) return;
      this.entities = this.entities.filter((c) =>
        c.id == currentFilterVal
      );
    },
    name(value) {
      if(value === undefined) return;
      let currentFilterVal = value;
      
      
      this.entities = JSON.parse(JSON.stringify(this.initialEntities));
      this.id = undefined;
      this.uri = undefined;
      if(!currentFilterVal) return;
      this.entities = this.entities.filter((c) =>
        c.name.toUpperCase().includes(currentFilterVal.toUpperCase())
      );
    },
    uri(value) {
      if(value === undefined) return;
      let currentFilterVal = value;
      
      
      this.entities = JSON.parse(JSON.stringify(this.initialEntities));
      this.id = undefined;
      this.name = undefined;
      if(!currentFilterVal) return;
      this.entities = this.entities.filter((c) =>
        c.uri.toUpperCase().includes(currentFilterVal.toUpperCase())
      );
    },
  },
};
</script>
<style lang="scss" scoped>
.submit-button {
  margin-bottom: 20px;
}
.environment-selection {
  flex-shrink: 1;
  flex-grow: 1;
}
.create-new-api-endpoint {
  flex-shrink: 1;
  flex-grow: 1;
  justify-content: end;
}
.btn {
  flex-shrink: 0;
  flex-grow: 0;
  align-self: flex-end;
}
.links {
  a:first-of-type {
    margin-right: 10px;
  }
}
.filter-controls td {
  padding: 0;
}
table {
  td:nth-of-type(1) {
    width: 80px;
  }
  td:nth-of-type(2) {
    width: 250px;
  }
}
</style>