<template>
  <section class="main" v-cloak>
    <div v-if="todos(this.$route.params.id).length">
      <label class="toggle-all">
        <base-checkbox v-model="allDone"/>
        <span>Выбрать все</span> 
      </label>
      
      <to-do-list class="todo-list" />
    </div>
    <div v-else>
      <h5 class="empty-list">Список задач пуст</h5>
    </div>
  </section>
</template>

<script>
  import ToDoList from '@/components/ToDoList';

  import {mapGetters} from 'vuex';

  export default {
    name: "Content",

    components: {
      ToDoList
    },
    
    computed: {
      ...mapGetters('todo', {
        todos: 'getTodos'
      }),
      allDone: {
        get: function () {
          return this.remaining === 0
        },
        set: function (value) {
          this.todos(this.$route.params.id).forEach((todo) => {
            todo.completed = value
          })
        }
      }
    }

  }
</script>

<style lang="scss" scoped>
  .toggle-all {
    margin-left: 1.5rem;  
  }
  .empty-list {
    text-align: center;
    margin-bottom: 3rem;
  }
</style>