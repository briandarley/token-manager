
<template>
  <div>
    <ClientNav></ClientNav>
    <h1 v-if="clientId">{{ clientId }}</h1>
    <h1 v-else>New Client</h1>
    <router-view></router-view>
  </div>
</template>
<script>
/* eslint-disable no-debugger */
import ClientNav from "../../components/menu-nav/clientNav.vue";
export default {
  components: { ClientNav },
  dependencies: ["ClientService", "SpinnerService","ToastService"],

  async mounted() {
    await this.initializeView();
  },
  data() {
    return {
      clientId: null,
    };
  },
  methods: {
    setProperties() {
      if (this.$route.params.id) {
        this.clientId = this.$route.params.id;
      }
    },
    async loadClient() {
      if (!this.clientId) return;

      let request = await this.ClientService.getClient({
        id: this.clientId,
      });
      let client = request[0];
      this.clientId = client.clientId;
    },
    async initializeView() {
      this.setProperties();
      
      try {
        this.SpinnerService.show();

        await this.loadClient();
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