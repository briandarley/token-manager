import injector from 'vue-inject';



export default function ToastService() {
  return {
    onShowToast: null,
    onHideToast: null,
    success(message) {
      if (this.onShowToast) {
        this.onShowToast('success', 'Success!', message);
      }
    },
    info(message) {
      if (this.onShowToast) {
        this.onShowToast('info', 'Information', message);
      }
      window.console.log(`Info: ${message}`);
    },
    warn(message) {
      if (this.onShowToast) {
        this.onShowToast('warning', 'Warning!', message);
      }
      window.console.log(`Warning: ${message}`);
    },
    error(message) {
      if (this.onShowToast) {
        this.onShowToast('danger', 'Error!', message);
      }
      window.console.log(`Error: ${message}`);
    },
    show(options) {
      if (this.onShowToast) {
        this.onShowToast(options);
      }
    },
    hide() {
      if (this.onHideToast) {
        this.onHideToast();
      }
    }

  }
}
injector.service('ToastService', ToastService)
