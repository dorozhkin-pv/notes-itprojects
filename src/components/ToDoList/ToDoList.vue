<template>
  <ul class="todo-list collection">
    <to-do-list-item
            v-for="todo in filteredTodos($route.params.id)"
            :key="todo.id"
            :todo="todo" />
  </ul>
</template>

<script>
  import ToDoListItem from "./ToDoListItem.vue";

  import {mapGetters, mapMutations} from 'vuex';

  export default {
    name: "ToDoList",

    components: {
      ToDoListItem
    },

    computed: {      
      ...mapGetters('todo', {
        editedTodo: 'getEditedTodo',
        filteredTodos: 'getFilteredTodos'
      })
    },
  }
</script>

<style scoped>

</style>