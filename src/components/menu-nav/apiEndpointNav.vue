<template>
  <div>
    <div
      class="navbar navbar-expand-lg navbar-primary bg-primary rounded"
      aria-label="API Endpoint Sub Nav"
    >
      <div class="container-fluid">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#apiEndpointSubNav"
          aria-controls="apiEndpointSubNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="apiEndpointSubNav">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" :to="apiEndpointPath" :class="{'active': navLinkActive('api-endpoint.edit')}"
                >API Endpoint</router-link
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
    this.setApiEndpointIdFromRoute();
  },
  data() {
    return {
      apiEndpointId: null,
      menuRoutes: {
        apiEndpointPath: "/api-endpoint",
      },
    };
  },
  methods: {
    setApiEndpointIdFromRoute() {
      this.apiEndpointId = this.$route.params.id;
    },
    navLinkActive(navLink){
      return this.$route.name == navLink;
    }
  },
  computed: {
    apiEndpointPath() {
      if (this.apiEndpointId)
        return `${this.menuRoutes.apiEndpointPath}/${this.apiEndpointId}`;
      return `${this.menuRoutes.apiEndpointPath}`;
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