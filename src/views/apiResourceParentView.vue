<template>
  <div>
    <h1 class="text-carolina-blue">API Resources</h1>
    <InfoCard level="info" class="mb-5">
      <template #message>
        <div>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
            Provident molestias illum, explicabo inventore accusantium quo repellat 
            culpa dicta quae ut veritatis corrupti dolorem maiores quaerat sit velit adipisci earum repudiandae.
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
    <div class="d-flex justify-content-end submit-button">
      <button
        class="btn btn-primary"
        type="button"
        @click="goToCreateNewApiResourceView"
      >
        Create New API Resource
      </button>
    </div>
    <table class="table table-condensed">
      <thead class="thead-primary">
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Name</th>
          <th scope="col">Display Name</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entity in entities" :key="entity.id">
          <td>{{ entity.id }}</td>
          <td>{{ entity.name }}</td>
          <td>{{ entity.displayName }}</td>
          <td>
            <router-link :to="{ name: 'api-resource', params: { id: entity.id } }"
              >edit</router-link
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
/* eslint-disable no-debugger */
export default {
  dependencies: ["ConfigReaderService", "ApiResourceService", "SpinnerService"],

  async mounted() {
    await this.initialize();
    this.environment = await this.ConfigReaderService.getEnvironment();
  },
  data() {
    return {
      environment: "none",
      entities: [],
    };
  },
  methods: {
    async initialize() {
      try {
        this.SpinnerService.show();
        this.entities = await this.ApiResourceService.getApiResources();
      } catch (error) {
        window.console.log(error);
      } finally {
        this.SpinnerService.hide();
      }
    },
    goToCreateNewApiResourceView() {
      this.$router.push({ name: "api-resource" });
    },
    
  },
};
</script>
<style lang="scss" scoped>
.submit-button {
  margin-bottom: 20px;
}
</style>