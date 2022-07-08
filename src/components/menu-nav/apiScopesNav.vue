<template>
  <div>
    <div
      class="navbar navbar-expand-lg navbar-primary bg-primary rounded"
      aria-label="API Scopes Sub Nav"
    >
      <div class="container-fluid">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#apiScopesSubNav"
          aria-controls="apiScopesSubNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="apiScopesSubNav">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" :to="apiScopesPath" :class="{'active': navLinkActive('api-scope.edit')}"
                >API Scopes</router-link
              >
            </li>
            <li class="nav-item" v-if="apiScopeId">
              <router-link class="nav-link" :to="apiScopeClaimsPath" :class="{'active': navLinkActive('api-scope.claims')}"
                >Claims</router-link
              >
            </li>
            <li class="nav-item" v-if="apiScopeId">
              <router-link class="nav-link" :to="apiScopePropertiesPath" :class="{'active': navLinkActive('api-scope.properties')}"
                >Properties</router-link
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
    this.setApiScopeIdFromRoute();
  },
  data() {
    return {
      apiScopeId: null,
      menuRoutes: {
        apiScopesPath: "/api-scope",
      },
    };
  },
  methods: {
    setApiScopeIdFromRoute() {
      this.apiScopeId = this.$route.params.id;
    },
    navLinkActive(navLink) {
      return this.$route.name == navLink;
    },
  },
  computed: {
    apiScopesPath() {
      if (this.apiScopeId)
        return `${this.menuRoutes.apiScopesPath}/${this.apiScopeId}`;
      return `${this.menuRoutes.apiScopesPath}`;
    },
    apiScopeClaimsPath() {
      if (this.apiScopeId)
        return `${this.menuRoutes.apiScopesPath}/${this.apiScopeId}/claims`;
      return "";
    },
    apiScopePropertiesPath() {
      if (this.apiScopeId)
        return `${this.menuRoutes.apiScopesPath}/${this.apiScopeId}/properties`;
      return "";
    },
  },
};
</script>
<style lang="scss" scoped>
.nav-link,
.nav-item a {
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