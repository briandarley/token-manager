<template>
  <div>
    <div
      class="navbar navbar-expand-lg navbar-primary bg-primary rounded"
      aria-label="API Resources Sub Nav"
    >
      <div class="container-fluid">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#apiResourceSubNav"
          aria-controls="apiResourceSubNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="apiResourceSubNav">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" :to="apiResourcePath" :class="{'active': navLinkActive('api-resource.edit')}"
                >API Resource</router-link
              >
            </li>
            <li class="nav-item" v-if="apiResourceId">
              <router-link class="nav-link" :to="apiResourceScopesPath" :class="{'active': navLinkActive('api-resource.scopes')}"
                >Scopes</router-link
              >
            </li>
            <li class="nav-item" v-if="apiResourceId">
              <router-link class="nav-link" :to="apiResourceClaimsPath" :class="{'active': navLinkActive('api-resource.claims')}"
                >Claims</router-link
              >
            </li>
            <li class="nav-item" v-if="apiResourceId">
              <router-link class="nav-link" :to="apiResourcePropertiesPath" :class="{'active': navLinkActive('api-resource.properties')}"
                >Properties</router-link
              >
            </li>
            <li class="nav-item" v-if="apiResourceId">
              <router-link class="nav-link" :to="apiResourceSecretsPath" :class="{'active': navLinkActive('api-resource.secrets')}"
                >Secrets</router-link
              >
            </li>
            
          </ul>
          
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    this.setApiResourceIdFromRoute();
  },
  data() {
    return {
      apiResourceId: null,
      menuRoutes: {
        apiResourcePath: "/api-resource",
      },
    };
  },
  methods: {
    setApiResourceIdFromRoute() {
      this.apiResourceId = this.$route.params.id;
    },
    navLinkActive(navLink){
      return this.$route.name == navLink;
    }
  },
  computed: {
    apiResourcePath() {
      if (this.apiResourceId)
        return `${this.menuRoutes.apiResourcePath}/${this.apiResourceId}`;
      return `${this.menuRoutes.apiResourcePath}`;
    },
    apiResourceScopesPath() {
      if (this.apiResourceId)
        return `${this.menuRoutes.apiResourcePath}/${this.apiResourceId}/scopes`;
      return "";
    },
    apiResourceClaimsPath() {
      if (this.apiResourceId)
        return `${this.menuRoutes.apiResourcePath}/${this.apiResourceId}/claims`;
      return "";
    },
    apiResourcePropertiesPath() {
      if (this.apiResourceId)
        return `${this.menuRoutes.apiResourcePath}/${this.apiResourceId}/properties`;
      return "";
    },
    apiResourceSecretsPath() {
      if (this.apiResourceId)
        return `${this.menuRoutes.apiResourcePath}/${this.apiResourceId}/secrets`;
      return "";
    }
    
  },
};
</script>
<style lang="scss" scoped>
.nav-link,.nav-item a {
  color: $white;
  &:hover {
    color: $white;
  }
}
.nav-item .active {
  color: #fff !important;
  font-weight: bold;
  text-decoration: underline;
}
</style>