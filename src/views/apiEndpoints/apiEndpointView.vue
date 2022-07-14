<template>
  <div>
    <ApiEndpointNav></ApiEndpointNav>
    
    <h1 v-if="name">{{ name }}</h1>
    <h1 v-else>New API Endpoint</h1>
    <router-view></router-view>
  </div>
</template>
<script>
import ApiEndpointNav from "../../components/menu-nav/apiEndpointNav.vue";
export default {
  components: { ApiEndpointNav },
  dependencies: ["ApiEndpointService", "SpinnerService","ToastService"],

  async mounted() {
    await this.initializeView();
  },
  data() {
    return {
      apiEndpointId: null,
      name: null
    };
  },
  methods: {
    setProperties() {
      if (this.$route.params.id) {
        this.apiEndpointId = this.$route.params.id;
      }
    },
    async loadApiResource() {
       if (!this.apiEndpointId) return;

       let request = await this.ApiEndpointService.getApiEndpoints({
         id: this.apiEndpointId,
       });
       
       let entity = request[0];
       this.apiEndpointId = entity.id;
       this.name = entity.name;
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
</style>