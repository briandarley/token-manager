<template>
  <div class="container">
    <h1>Home</h1>
    <i class="bi bi-activity"></i>
    <div v-html="userName"></div>
    
    <button class="btn btn-primary" @click="showUserName">Test</button>
  </div>
</template>
<script>

export default {
  
  setup() {

  },
  mounted() {

  },
  methods: {
    showUserName() {
      this.userName = this.userProfileService.getUserName();
      
    },
  },
  data() {
    return {
      userName: "",
      userProfileService: {},
    };
  },
};
</script>
<style lang="scss">
</style>