<template>
  
    <div class="form-group">
      <label :for="id" class="form-label">{{label}}</label>
      
      <input
        type="text"
        :id="id"
        :name="id"
        class="form-control"
        :class="{'is-valid': isValid === true, 'is-invalid': isValid === false}"
        :value="modelValue"
        :required="required"
        @input="updateValue"
      />
      <span v-if="error" class="form-text invalid-feedback">{{error}}</span>
    </div>
  
</template>
<script>

export default {
    
  dependencies: [],
  props: ["id","label","required","modelValue"],
  
  data() {
    return {
      error: null,
      isValid: null,
    };
  },
  methods: {
        // eslint-disable-next-line no-unused-vars
        onUpdate(val) {

        },
        updateValue(event) {
            // eslint-disable-next-line no-debugger
            
             this.$emit('update:modelValue', event.target.value);
             this.onUpdate(event.target.value);
        }

  },
//   watch: {
//     modelValue(newVal, oldVal) {
//         if(newVal && newVal.trim()){

//         }
//     }
//   }

  
};
</script>
<style lang="scss">
</style>