<template>
  <!-- data-bs-autohide="false" -->
  <div
    class="toast"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
    ref="toast"
  >
    <div class="toast-header" ref="header" :class="headerBackGround">
      <strong class="mr-auto" :class="headerBackGround">{{ title }}</strong>

      <button
        type="button"
        class="ml-2 mb-1 close"
        data-dismiss="toast"
        aria-label="Close"
        :class="buttonStyle"
        @click="close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="toast-body">
      <p>{{ message }}</p>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-unused-vars */
import { Toast } from "bootstrap";
//import JQuery from 'jquery';
//import styles from "./toastMessage.vue?vue&type=style&index=0&lang=scss&module=1";

export default {
  dependencies: ["ToastService"],

  mounted() {
    this.initializeService();
  },
  data() {
    return {
      message: "",
      title: "",
      level: "",
      toastElement: null,
    };
  },
  computed: {
    headerBackGround() {
      switch (this.level) {
        case "info":
          return "bg-info text-light";
        case "success":
          return "bg-success text-light";
        case "warning":
          return "bg-warning text-dark";
        case "danger":
          return "bg-danger text-light";
        default:
          return "bg-success text-light";
      }
    },
    buttonStyle() {
      switch (this.level) {
        case "info":
          return "button-info";
        case "warning":
          return "button-warning";
        case "danger":
          return "button-danger";
        default:
          return "button-success";
      }
    },
  },
  methods: {
    initializeService() {
      this.ToastService.onHideSpinner = this.hideToast;
      this.ToastService.onShowToast = this.showToast;
    },
    close() {
      if (this.toastElement) {
        this.toastElement.hide();
        this.toastElement = null;
      }
    },
    showToast(level, title, msg, delay) {
      this.level = level;
      this.message = msg;
      this.title = title;

      let options = {
        delay: 3000,
        animation: true
      };
      if (delay) {
        options.delay = delay;
      }
      if (this.toastElement) {
        options.delay *= 2;
      }
      this.toastElement = new Toast(this.$refs.toast, options);

      this.$refs.toast.addEventListener("hidden.bs.toast", this.onHideToast);

      this.toastElement.show();
    },
    onHideToast() {
      this.toastElement = null;
    },
  },
};
</script>
<style lang="scss" scoped>
.close {
  color: $light;
  border: 1px solid $white;
  border-radius: 5px;
  &.button-info {
    background: $info;
  }
  &.button-warning {
    background: $warning;
    border: 1px solid $dark;
    color: $dark;
  }
  &.button-danger {
    background: $danger;
  }
  &.button-success {
    background: $success;
  }
}

.toast {
  position: absolute;
  bottom: 0;
  right: 0;
}
.toast-header {
  display: flex;
  svg {
    flex-shrink: 0;
    width: 20px;
    justify-self: start;
    margin-right: 10px;
  }
  strong {
    flex: 1;
  }
  small {
    flex: 1;
  }
  button {
    flex: 0;
    justify-self: end;
  }
}

:export {
  primary: $primary;
  warning: $warning;
  danger: $danger;
  success: $success;
}
</style>