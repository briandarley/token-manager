<template>
  <div class="container">
    <div class="login-form">
      <h1 class="text-carolina-blue">Token Manager Utility</h1>

      <InfoCard level="info">
        <template #message>
          <div>
            <p>
              This tool is used to manage clients, resources, and generating
              tokens.
            </p>
            <p>
              To access this resource please log in. In order to manage clients
              and resources you'll need to be a member of
              <span class="strong text-nowrap">ITS_WSP-Access-ITSWS</span>.
            </p>
          </div>
        </template>
      </InfoCard>

      <div class="d-flex justify-content-center m-5">
        <button class="btn btn-primary btn-lg" @click="login">
          <i class="fa fa-sign-in"></i><span> Login</span>
        </button>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@media (max-width: $sm-width) {
    h1{font-size: 1.2em;}
    .login-form {
      font-size:.8em;
    }
}
.login-form {
  position: fixed;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);
}
</style>
<script>
export default {
  dependencies: ["ConfigReaderService", "UserProfileService"],
  

  
  methods: {
    login() {
      this.UserProfileService.login();
    }
  }
};
</script>
