import injector from 'vue-inject';
export default function SpinnerService() {
    return {
        onShowSpinner: null,
        onHideSpinner: null,
        onToggleSpinner: null,
        show(options) {
         if (this.onShowSpinner) {
            this.onShowSpinner(options);
          }
        },
        hide() {
          if (this.onHideSpinner) {
            this.onHideSpinner();
          }
        },
        toggle() {
          if (this.onToggleSpinner) {
            this.onToggleSpinner();
          }
        }
    }
}
injector.service('SpinnerService', SpinnerService)
