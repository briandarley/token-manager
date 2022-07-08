<template>
  <nav
    class="navbar navbar-expand-lg navbar-light bg-light rounded"
    aria-label="Main Nav"
  >
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Identity Server Manager</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#mainNav"
        aria-controls="mainNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="mainNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/clients" >Clients</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/api-scopes" >API Scopes</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/api-resources" >API Resources</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/tokens" >Tokens</router-link>
          </li>
        </ul>
        <div>
         Env: {{ environment }}
         
         <i class="bi bi-three-dots-vertical"></i>
         <a href="#" @click.prevent="logOut">
         {{ userName }} <i class="fa fa-sign-out"></i>
         </a>
         
         </div>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  dependencies: ["ConfigReaderService", "UserProfileService"],
  setup() {},
  created() {},
  async mounted() {
    await this.setEnvironmentVariable();
    await this.setUserName();
  },
  data() {
    return {
      environment: "none",
      userName: "none",
    };
  },
  methods: {
    async setEnvironmentVariable() {
      this.environment = await this.ConfigReaderService.getEnvironment();
    },
    async setUserName() {
      this.userName = await this.UserProfileService.getUserName();
    },
    async logOut() {
      await this.UserProfileService.logOut();
    }
  },
};
</script>
<style lang="scss" scoped>
</style>