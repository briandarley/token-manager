<template>
  <div class="container">
    <h1>Home</h1>

    <button class="btn btn-primary" @click="test">Test</button>
    <button class="btn btn-success" @click="success">success</button>
    <button class="btn btn-warning" @click="warning">Warn</button>
    <button class="btn btn-danger" @click="danger">Danger</button>
    <!-- <ToastMessage ref="toaster"></ToastMessage> -->
  </div>
</template>
<script>
export default {
  dependencies: ["SpinnerService", "ToastService"],
  mounted() {},
  methods: {
    test() {
      //this.SpinnerService.show();
      // this.$refs.toaster.showMessage("test from home");
      //this.ToastService.showToast()
      //this.ToastService.sucess("success !!! this is a success");
      //this.ToastService.warn("warning !!! this is a warning");
    },
    success() {
      this.ToastService.success("success !!! this is a success");
    },
    warning() {
      this.ToastService.warn("warning !!! this is a warning");
    },
    danger() {
      this.ToastService.error("Error !!! this is an error");
    },
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss">
</style>