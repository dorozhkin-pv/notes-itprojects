<template>
  <header class="header">
    <div class="row">
      <div class="input-field col s12">
        <base-input ref="input"
                    class="new-todo"
                    autofocus
                    placeholder="Что вы собираетесь сделать?"
                    @keyup:enter="handleInput($event)"/>
      </div>
    </div>
  </header>
</template>

<script>
  import { mapMutations } from 'vuex';
  import * as M from '@/store/todo/mutation_types';

  import { ToDo } from '@/helpers';
  
  export default {
    name: "HeaderComponent",

    methods: {
      ...mapMutations('todo', [
        M.ADD_TODO
      ]),
      handleInput(data) {
        let value = data && data.trim();
        if (!value) {
          return;
        }
        this[M.ADD_TODO]({ todo: ToDo(value), id: this.$route.params.id });
        this.refreshInnerValue();
      },
      refreshInnerValue() {
        this.$refs.input.refreshInnerValue();
      }
    }
  }
</script>

<style scoped>

</style>