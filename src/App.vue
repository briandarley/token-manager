<template>

  <AppStart v-if="userName == 'none' || !userName"></AppStart>
  
  <div class="container" v-else>
    <TopNav></TopNav>
    <router-view></router-view>
    <SpinnerControl></SpinnerControl>
    <ToastMessage></ToastMessage>
  </div>
  
</template>

<script>
import AppStart from "./views/AppStart";

export default {
  name: "App",
  components: { AppStart },
  dependencies: ["ConfigReaderService", "UserProfileService"],

  setup() {},
  created() {},

  data() {
    return {
      //environment: "none",
      userName: "none",
      configReaderService: null,
    };
  },
  async mounted() {
    this.initialize();
    
    
  },
  methods: {
    
    async initialize() {
      //this.environment = await this.ConfigReaderService.getEnvironment();
      this.userName = await this.UserProfileService.getUserName();
    }
    
  },
};
</script>

<style lang="scss">
</style>
