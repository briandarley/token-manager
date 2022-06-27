<template>
  <div>
    <h1 class="text-carolina-blue">Clients</h1>
    <InfoCard level="info" class="mb-5">
      <template #message>
        <div>
          <p>
            A client is a piece of software that requests tokens from
            IdentityServer - either for authenticating a user (requesting an
            identity token) or for accessing a resource (requesting an access
            token). A client must be first registered with IdentityServer before
            it can request tokens.
          </p>
          <p>
            Examples for clients are web applications, native mobile or desktop
            applications, SPAs, server processes etc.
          </p>

          List of clients in the
          <span class="text-uppercase strong">{{ environment }}</span>
          environment.
        </div>
      </template>
    </InfoCard>
    <div class="d-flex justify-content-end submit-button">
      <button
        class="btn btn-primary"
        type="button"
        @click="goToCreateNewClientView"
      >
        Create New Client
      </button>
    </div>
    <table class="table table-condensed">
      <thead class="thead-primary">
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Name</th>
          <th scope="col">Grant Type</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entity in entities" :key="entity.id">
          <td>{{ entity.id }}</td>
          <td>{{ entity.clientId }}</td>
          <td>
            {{ entity.allowedGrantTypes.map((c) => c.grantType).join(",") }}
          </td>
          <td>
            <router-link :to="{ name: 'client', params: { id: entity.id } }"
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
  dependencies: ["ConfigReaderService", "ClientService", "SpinnerService"],

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
        this.entities = await this.ClientService.getClients();
      } catch (error) {
        window.console.log(error);
      } finally {
        this.SpinnerService.hide();
      }
    },
    goToCreateNewClientView() {
      this.$router.push({ name: "client" });
    },
  },
};
</script>
<style lang="scss" scoped>
.submit-button {
  margin-bottom: 20px;
}
</style>