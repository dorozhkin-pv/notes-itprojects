import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import materialize from 'materialize-css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars, faPlusCircle, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import BaseInput from '@/components/BaseInput';
import BaseCheckbox from '@/components/BaseCheckbox';
import Modal from '@/components/Modal';
import message from '@/plugins/message.plugin.js';

library.add(faBars, faPlusCircle, faPaperPlane);
 
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('BaseInput', BaseInput);
Vue.component('BaseCheckbox', BaseCheckbox);
Vue.component('Modal', Modal);

Vue.use(message);
Vue.use(materialize);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
