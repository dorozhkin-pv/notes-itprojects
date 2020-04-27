<template>
  <li class="todo collection-item" :class="{ completed: todo.completed, editing: todo.id === ( editedTodo ? editedTodo.id : null ) }">
    <div class="view">
      <div class="view-body">
        <label>
          <base-checkbox class="toggle" v-model="todo.completed"/>
          <span></span> 
        </label>
        <div class="todo-title" @click="editTodo(todo)">{{ todo.title }}</div>
      </div>
      <button class="destroy waves-effect waves-light btn-small" @click="removeTodo(todo)">x</button>
    </div>

    <div class="row edit">
      <div class="input-field col s12">
        <base-input  
            ref="baseInput"
            :value="todo.title"
            @blur="cancelEdit(todo)"
            @keyup:esc="cancelEdit(todo)"
            @keyup:enter="doneEdit(todo, $event)"/>
      </div>
    </div>
  </li>
</template>

<script>
  import {filters} from '@/helpers';  

  import {mapGetters, mapActions, mapMutations} from 'vuex';
  import * as M from '@/store/todo/mutation_types.js';

  export default {
    name: "ToDoListItem",
    
    props: {
      todo: Object
    },

    computed: {
      ...mapGetters('todo', {
        editedTodo: 'getEditedTodo'
      }),
    },

    methods: {
      ...mapMutations('todo', [
        M.REMOVE_TODO,
        M.SET_EDITED_TODO,
        M.SET_TODO_TITLE
      ]),
      editTodo(todo) {
        this.beforeEditCache = todo.title;
        this[M.SET_EDITED_TODO]({ payload: todo });
      },
      removeTodo(todo) {
        this[M.REMOVE_TODO]({ payload: {noteId: this.$route.params.id, todoId: todo.id} });
      },
      doneEdit(todo, value) {
        if (!this.editedTodo) {
          return;
        }
        this[M.SET_EDITED_TODO]({ payload: null });
        this[M.SET_TODO_TITLE]({payload: {noteId: this.$route.params.id, todoId: todo.id, title: value.trim()}});
        if (!todo.title) {
          this.removeTodo(todo);
        }
      },
      cancelEdit(todo) {
        this[M.SET_EDITED_TODO]({ payload: null });
        this[M.SET_TODO_TITLE]({payload: {noteId: this.$route.params.id, todoId: todo.id, title: this.beforeEditCache}});
        this.$refs.baseInput.refreshInnerValue();
      },
    }
  }
</script>

<style lang="scss" scoped>
  .edit {
    display: none;
    margin: 0;
    & .input-field {
      margin: 0;
    }
  }
  .editing {
    & .view {
      display: none;
    }
    & .edit {
      display: block;
    }
  }
  .view {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-body {
      display: flex;
      width: 90%;
      align-items: center;
      overflow: hidden;
    }
  }
  .todo-title {
    width: 90%;
  }
  .completed .todo-title{
    text-decoration: line-through;
  }
  [type="checkbox"]+span:not(.lever) {
    display: block;
  }
</style>