<template>
  <div>
    <ApiScopesNav></ApiScopesNav>
    <h1 v-if="name">{{ name }}</h1>
    <h1 v-else>New API Scope</h1>
    <router-view></router-view>
  </div>
</template>
<script>
import ApiScopesNav from "../../components/menu-nav/apiScopesNav.vue";
export default {
  components: { ApiScopesNav },
  dependencies: ["ApiScopesService", "SpinnerService", "ToastService"],

  async mounted() {
    await this.initializeView();
  },
  data() {
    return {
      apiScopeId: null,
      name: null,
    };
  },
  methods: {
    setProperties() {
      if (this.$route.params.id) {
        this.apiScopeId = this.$route.params.id;
      }
    },
    async loadApiScope() {
      if (!this.apiScopeId) return;

      let request = await this.ApiScopesService.getApiScope({
        id: this.apiResourceId,
      });
      let apiScope = request[0];
      this.apiScopeId = apiScope.id;
      this.name = apiScope.name;
    },
    async initializeView() {
      this.setProperties();

      try {
        this.SpinnerService.show();

        await this.loadApiScope();
      } catch (error) {
        this.ToastService.error(error);
      } finally {
        this.SpinnerService.hide();
      }
    },
  },
};
</script>
<style lang="scss">
h1 {
  color: $carolina-blue;
}
table tr td {
  &:last-of-type {
    text-align: right;
    padding-right: 15px;
  }
}
</style>