<template>
  <div id="app">
    <component :is="layout">
      <router-view></router-view>
    </component>
    <modal v-if="showModal" />
  </div>
</template>

<script>
  import EmptyLayout from '@/layout/EmptyLayout';
  import MainLayout from '@/layout/MainLayout';

  import { mapGetters, mapMutations } from 'vuex';
  import * as M from '@/store/todo/mutation_types.js';

  import * as helpers from '@/helpers';
  const { storageHandlers }  = helpers;

  export default {
    name: 'Navbar',
    
    components: {
      EmptyLayout,
      MainLayout
    },

    created() {
      const notes = storageHandlers.inStorage();
      if (notes) this[M.SET_NOTES]({payload: notes})
    },

    methods: {
      ...mapMutations('todo', [ M.SET_NOTES ])
    },

    computed: {
      ...mapGetters('todo', [ 'showModal' ]),
      layout() {
        return this.$route.meta.layout + '-layout';
      }
    },
  }
</script>

<style lang="scss" scoped>
@import '~materialize-css/dist/css/materialize.min.css';


</style>