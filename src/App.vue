<template>
  <div>
    {{ environment }}
  </div>
  <AppStart></AppStart>
  <router-view></router-view>
</template>

<script>
import ConfigReaderService from "./services/configReaderService";
import AppStart from "./components/views/AppStart";


export default {
  name: "App",
  components: {
      AppStart
  },
  data() {
    return {
      environment: "none",
    };
  },
  async mounted() {
    this.environment = await this.getConfiguration();
  },
  methods: {
    async getConfiguration() {
      window.console.log(await ConfigReaderService().getEnvironment());

      return await ConfigReaderService().getEnvironment();
    },
  },
};
</script>

<style lang="scss">

</style>
