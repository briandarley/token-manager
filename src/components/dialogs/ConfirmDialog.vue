<template>
  <div class="modal-container">

    <div
      :id="id"
      class="modal fade"
      role="dialog"
      aria-hidden="true"
      aria-labelledby="modalTitle modalContent"
      tabindex="-1"
      :ref="id"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header bg-primary">
            <h5 class="modal-title">
              <slot name="modal-title" id="modalTitle">
                <div>content</div>
              </slot>
            </h5>

            <button
              type="button"
              class="close-button close"
              @click="hide()"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <slot name="modal-body" id="modalContent"></slot>
          </div>
          <div class="modal-footer">
            <slot name="modal-footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "confirm-dialog",
  props: ["id", "width"],
  methods: {
    hide: function () {
        window.console.log("hidding");
        
      const $ = window.jQuery;
      $(`#${this.id}`).modal("hide").appendTo(this.$el);
    },
    show: function () {
        window.console.log("showing");
      const $ = window.jQuery;

      let element = $("#" + this.id);

      if (this.width) {
        element.modal("show").appendTo("body");
      } else {
        element.modal("show").appendTo("body");
      }

      if (this.width) {
        $(`#${this.id} .modal-dialog`).css("max-width", `${this.width}px`);
      } else {
        $(`#${this.id} .modal-dialog`).css("max-width", `500px`);
      }

      setTimeout(() => {
        //$(`#${this.id} .modal-dialog button`).focus();
        $(`#${this.id} .modal-dialog .modal-title`).focus();
      }, 1050);

      element.on("hide.bs.modal", () => {
        this.$emit("close");
      });
    },
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss">
</style>