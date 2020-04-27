import VueTypes from 'vue-types';

export default {
  value: VueTypes.oneOfType([
    String, Number
  ]).def('')
};