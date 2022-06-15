<template>
  <div>
    {{ environment }}
  </div>
  <AppStart></AppStart>
  <router-view></router-view>
</template>

<script>
import AppStart from "./components/views/AppStart";

export default {
  name: "App",
  components: { AppStart },
  dependencies: ["ConfigReaderService"],

  setup() {},
  created() {},

  data() {
    return {
      environment: "none",
      configReaderService: null,
    };
  },
  async mounted() {
    this.initialize();
    
  },
  methods: {
    async initialize() {
      this.environment = await this.getConfiguration();
    },
    async getConfiguration() {
      return await this.ConfigReaderService.getEnvironment();
    },
  },
};
</script>

<style lang="scss">
</style>
