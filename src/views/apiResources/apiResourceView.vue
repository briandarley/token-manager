
<template>
  <div>
    <ApiResourcesNav></ApiResourcesNav>
    <h1 v-if="name">{{ name }}</h1>
    <h1 v-else>New API Resource</h1>
    <router-view></router-view>
  </div>
</template>
<script>
/* eslint-disable no-debugger */
import ApiResourcesNav from "../../components/menu-nav/apiResourcesNav.vue";
export default {
  components: { ApiResourcesNav },
  dependencies: ["ApiResourceService", "SpinnerService","ToastService"],

  async mounted() {
    await this.initializeView();
  },
  data() {
    return {
      apiResourceId: null,
      name: null
    };
  },
  methods: {
    setProperties() {
      if (this.$route.params.id) {
        this.apiResourceId = this.$route.params.id;
      }
    },
    async loadApiResource() {
      if (!this.apiResourceId) return;

      let request = await this.ApiResourceService.getApiResource({
        id: this.apiResourceId,
      });
      let apiResource = request[0];
      this.apiResourceId = apiResource.id;
      this.name = apiResource.name;
    },
    async initializeView() {
      this.setProperties();
      
      try {
        this.SpinnerService.show();

        await this.loadApiResource();
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