<template>
  <div class="spinner" ref="spinner" :class="{ hidden: !processing }" :id="id">
    <div class="spinner-container">
      <div class="fulfilling-bouncing-circle-spinner">
        <div class="circle"></div>
        <div class="orbit"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  dependencies: ["SpinnerService"],
  props: ["allowServiceUpdate", "id"],
  mounted() {
    this.initializeService();
  },
  data() {
    return {
      processing: false,
      
    };
  },
  methods: {
    initializeService() {
      if (
        this.allowServiceUpdate !== false &&
        this.allowServiceUpdate !== "false"
      ) {
        this.SpinnerService.onToggleSpinner = this.toggleSpinner;
        this.SpinnerService.onHideSpinner = this.hideSpinner;
        this.SpinnerService.onShowSpinner = this.showSpinner;
      }
    },
    showSpinner() {
      //let $ = this.$;
      this.processing = true;
      //this.EventBus.emit("attach-scroll");

      //   let el = $(`#${this.id}`);
      //   let appSection = $($(".app-section")[0]);
      //   let wrapper = $(el.parents(".simplebar-content-wrapper")[0]);
      //   let viewHeight = appSection.height();
      //   let offSet = wrapper.scrollTop();

      //   el.height(viewHeight + offSet);

      //   //execute every 100ms, then stop after 1sec
      //   let handle = setInterval(() => {
      //     viewHeight = appSection.height();
      //     offSet = wrapper.scrollTop();

      //     el.height(viewHeight + offSet);
      //   }, 100);

      //   setTimeout(() => {
      //     clearInterval(handle);
      //   }, 1000);

      // let el = $(`#${this.id}`);
      // window.console.log($(el))
    },
    hideSpinner() {
      this.processing = false;
    },
    toggleSpinner() {
      this.processing = !this.processing;
    },
  },
};
</script>
<style lang="scss" scoped>
.hidden {
  display: none !important;
}
.spinner {
  position: absolute;
  background-color: rgba(175, 202, 226, 0.75);
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  z-index: 101;

  display: grid;

  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(3, 1fr);

  // height: 100vh !important;
  // border: 10px solid red;
}

.spinner-container {
  grid-row: 2;
  grid-column: 2;
  align-self: center;
}

.fulfilling-bouncing-circle-spinner,
.fulfilling-bouncing-circle-spinner * {
  box-sizing: border-box;
}

.fulfilling-bouncing-circle-spinner {
  margin-right: auto;
  margin-left: auto;
  height: 60px;
  width: 60px;
  position: relative;
  animation: fulfilling-bouncing-circle-spinner-animation infinite 4000ms ease;
}

.fulfilling-bouncing-circle-spinner .orbit {
  height: 60px;
  width: 60px;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 50%;
  border: calc(60px * 0.03) solid #4b9cd3;
  animation: fulfilling-bouncing-circle-spinner-orbit-animation infinite 4000ms
    ease;
}

.fulfilling-bouncing-circle-spinner .circle {
  height: 60px;
  width: 60px;
  color: #4b9cd3;
  display: block;
  border-radius: 50%;
  position: relative;
  border: calc(60px * 0.1) solid #4b9cd3;
  animation: fulfilling-bouncing-circle-spinner-circle-animation infinite 4000ms
    ease;
  transform: rotate(0deg) scale(1);
}

@keyframes fulfilling-bouncing-circle-spinner-animation {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes fulfilling-bouncing-circle-spinner-orbit-animation {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1);
  }

  62.5% {
    transform: scale(0.8);
  }

  75% {
    transform: scale(1);
  }

  87.5% {
    transform: scale(0.8);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes fulfilling-bouncing-circle-spinner-circle-animation {
  0% {
    transform: scale(1);
    border-color: transparent;
    border-top-color: inherit;
  }

  16.7% {
    border-color: transparent;
    border-top-color: initial;
    border-right-color: initial;
  }

  33.4% {
    border-color: transparent;
    border-top-color: inherit;
    border-right-color: inherit;
    border-bottom-color: inherit;
  }

  50% {
    border-color: inherit;
    transform: scale(1);
  }

  62.5% {
    border-color: inherit;
    transform: scale(1.4);
  }

  75% {
    border-color: inherit;
    transform: scale(1);
    opacity: 1;
  }

  87.5% {
    border-color: inherit;
    transform: scale(1.4);
  }

  100% {
    border-color: transparent;
    border-top-color: inherit;
    transform: scale(1);
  }
}
</style>