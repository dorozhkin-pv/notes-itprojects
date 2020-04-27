<template>
  <input class="edit" type="text" :value="innerValue" 
      @input="innerValue = $event.target.value" 
      @blur="handlerBlur"
      @keyup.esc="handlerKeyupEsc"
      @keyup.enter="handlerKeyupEnter">
</template>

<script>
  import defaultProps from './BaseInputDefaultProps.js';

  const props = defaultProps;

  export default {
    name: "BaseInput",

    props,

    data() {
      return {
        innerValue: this.value,
        blur: true,
        otherEvents: false
      };
    },
    
    methods: {
      handlerBlur(){
        if (!this.blur && this.otherEvents) {
          this.blur = true;
          this.otherEvents = false;
          return;
        }
        this.$emit('blur', this.innerValue);
      },
      handlerKeyupEsc(){
        this.blur = false;
        this.otherEvents = true;
        this.$emit('keyup:esc', this.innerValue);
      },
      handlerKeyupEnter(){
        this.blur = false;
        this.otherEvents = true;
        this.$emit('keyup:enter', this.innerValue);
      },
      refreshInnerValue(){
        this.innerValue = this.value;
      }
    }
  }
</script>

<style scoped>

</style>