import VueTypes from 'vue-types';

export default {
  value: VueTypes.oneOfType([
    Boolean
  ]).def(false),
    val: VueTypes.oneOfType([
        String, Number
    ]).def('')
};