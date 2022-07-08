<template>
  <div class="form-group">
    <label :for="name" class="form-label">{{ label }}</label>
    <div
      class="input-group date"
      :id="name"
      :ref="name"
      :class="{ 'has-error': !!errorMessage, success: meta.valid }"
    >
      <input
        type="text"
        :name="name"
        class="form-control"
        :placeholder="placeHolder"
        :value="inputValue"
        @input="valueChanged"
        @change="valueChanged"
        @blur="handleBlur"
        ref="textbox"
      />
      <span class="input-group-append">
        <span class="input-group-text bg-white d-block">
          <i class="fa fa-calendar"></i>
        </span>
      </span>
    </div>

    <span class="form-text" v-show="errorMessage || meta.valid" role="alert">
      {{ errorMessage }}
    </span>
  </div>
</template>
<script>

import "bootstrap-datepicker";
//import "bootstrap-datetimepicker/src/js/bootstrap-datetimepicker";
import { toRef, onMounted, getCurrentInstance } from "vue";
import { useField } from "vee-validate";
import jQuery from "jquery";
export default {
  //dependencies: [],
  emits: ["update:modelValue"],
  props: {
    label: {
      type: String,
      default: "Date",
    },
    placeHolder: {
      type: String,
      default: "mm/dd/yyyy",
    },
    value: {
      type: String,
    },

    name: {
      type: String,
      required: true,
    },
  },

  setup(props, { emit }) {
    const name = toRef(props, "name");
    let cntx = getCurrentInstance();
    
    
    onMounted(() => {
      jQuery(`#${props.name}`)
        .datepicker({
          format: "mm/dd/yyyy",
          autoclose: true,
        })
        .on("changeDate", function (e) {
          let dateValue = getFormattedDate(e.date);
          cntx.refs.textbox.value = dateValue;
        
            var event = new Event('input', {
                bubbles:true,
                cancelable: true
            })
            cntx.refs.textbox.dispatchEvent(event);
         
        });
    });

    const {
      value: inputValue,
      errorMessage,
      handleBlur,
      handleChange,
      meta,
    } = useField(name, undefined, {
      initialValue: props.value,
    });

    function valueChanged(event) {
      handleChange(event);
      emit("update:modelValue", event.target.value);
    }

    function getFormattedDate(date) {
      let year = date.getFullYear();
      let month = (1 + date.getMonth()).toString().padStart(2, "0");
      let day = date.getDate().toString().padStart(2, "0");

      return month + "/" + day + "/" + year;
    }

    return {
      valueChanged,
      handleChange,
      handleBlur,
      errorMessage,
      inputValue,
      meta,
    };
  },
};
</script>
<style lang="scss">
</style>