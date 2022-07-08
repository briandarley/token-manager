<template>
  <div>
    <div
      class="navbar navbar-expand-lg navbar-primary bg-primary rounded"
      aria-label="Client Sub Nav"
    >
      <div class="container-fluid">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#clientSubNav"
          aria-controls="clientSubNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="clientSubNav">
          <ul class="navbar-nav mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" :to="clientPath" :class="{'active': navLinkActive('client.edit')}"
                >Client</router-link
              >
            </li>
            <li class="nav-item" v-if="clientId">
              <router-link class="nav-link" :to="clientSecretPath" :class="{'active': navLinkActive('client.secrets')}"
                >Secrets</router-link
              >
            </li>
            <li class="nav-item" v-if="clientId">
              <router-link class="nav-link" :to="clientScopesPath" :class="{'active': navLinkActive('client.scopes')}"
                >Scopes</router-link
              >
            </li>
            <li class="nav-item" v-if="clientId">
              <router-link class="nav-link" :to="clientCorsPath" :class="{'active': navLinkActive('client.cors')}"
                >CORS</router-link
              >
            </li>
            <li class="nav-item" v-if="clientId">
              <router-link class="nav-link" :to="clientGrantTypesPath" :class="{'active': navLinkActive('client.grantTypes')}"
                >Grant Types</router-link
              >
            </li>
            <li class="nav-item" v-if="clientId">
              <router-link class="nav-link" :to="clientRedirectsPath" :class="{'active': navLinkActive('client.redirects')}"
                >Redirects</router-link
              >
            </li>
            <li class="nav-item" v-if="clientId">
              <router-link class="nav-link" :to="clientRestrictionsPath" :class="{'active': navLinkActive('client.restrictions')}"
                >Restrictions</router-link
              >
            </li>
            <li class="nav-item" v-if="clientId">
              <router-link class="nav-link" :to="clientClaimsPath" :class="{'active': navLinkActive('client.claims')}"
                >Client Claims</router-link
              >
            </li>
            <li class="nav-item" v-if="clientId">
              <router-link class="nav-link" :to="clientPropertiesPath" :class="{'active': navLinkActive('client.properties')}"
                >Client Properties</router-link
              >
            </li>
          </ul>
          <!--<div>Additional Info</div>-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    this.setClientIdFromRoute();
    
  },
  data() {
    return {
      clientId: null,
      menuRoutes: {
        clientPath: "/client",
      },
    };
  },
  methods: {
    setClientIdFromRoute() {
      this.clientId = this.$route.params.id;
    },
    navLinkActive(navLink){
      return this.$route.name == navLink;
    }
  },
  computed: {
    clientPath() {
      if (this.clientId)
        return `${this.menuRoutes.clientPath}/${this.clientId}`;
      return `${this.menuRoutes.clientPath}`;
    },
    clientSecretPath() {
      if (this.clientId)
        return `${this.menuRoutes.clientPath}/${this.clientId}/secrets`;
      return "";
    },
    clientScopesPath() {
      if (this.clientId)
        return `${this.menuRoutes.clientPath}/${this.clientId}/scopes`;
      return "";
    },
    clientCorsPath() {
      if (this.clientId)
        return `${this.menuRoutes.clientPath}/${this.clientId}/cors`;
      return "";
    },
    clientGrantTypesPath() {
      if (this.clientId)
        return `${this.menuRoutes.clientPath}/${this.clientId}/grant-types`;
      return "";
    },
    clientRedirectsPath() {
        if (this.clientId)
        return `${this.menuRoutes.clientPath}/${this.clientId}/redirects`;
      return "";
    },
    clientRestrictionsPath() {
        if (this.clientId)
        return `${this.menuRoutes.clientPath}/${this.clientId}/restrictions`;
      return "";
    },
    clientClaimsPath() {
        if (this.clientId)
        return `${this.menuRoutes.clientPath}/${this.clientId}/claims`;
      return "";
    },
    clientPropertiesPath() {
        if (this.clientId)
        return `${this.menuRoutes.clientPath}/${this.clientId}/properties`;
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
.nav-item .active{
  color: #fff !important;
  font-weight: bold;
  text-decoration: underline;
}
</style>