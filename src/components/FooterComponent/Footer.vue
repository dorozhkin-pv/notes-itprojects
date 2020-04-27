<template>
  <footer class="footer" v-show="todos(this.$route.params.id).length" v-cloak>
    <div class="footer-filters">
      <span class="todo-count">
        <strong>{{ remaining }}</strong> {{ remaining | pluralize('задача осталась', 'задачи остались', 'задач осталось') }}
      </span>
      <ul class="filters">
        <li class="filters-item" v-for="filter in filtersArray" :key="filter + Date.now()">
            <a href="#" class="light-blue darken-3 waves-effect waves-light btn-small" 
                        :class="{ selected: visibility === filter }"
                        @click.prevent="handlerFilterClick(filter)">
              {{ filter }}
            </a>
        </li>
      </ul>
    </div>
    <div class="footer-clear-all">
      <button class="waves-effect waves-light btn-small" @click="removeCompleted" v-show="todos(this.$route.params.id).length > remaining">
        Очистить завершенные
      </button>
    </div>
  </footer>
</template>

<script>
  import {filters} from '@/helpers';

  import {mapGetters, mapMutations} from 'vuex';
  import * as M from '@/store/todo/mutation_types';

  export default {
    name: "FooterComponent",
    
    created() {
      this.filtersArray = Object.keys(filters);
    },

    methods: {
      ...mapMutations('todo', [
        M.SET_VISIBILITY,
        M.SET_TODOS
      ]),
      handlerFilterClick(filter) {
        if (filters[filter]) {
          this[M.SET_VISIBILITY]({payload: filter});
        } else {
          this[M.SET_VISIBILITY]({payload: 'all'});
        }
      },
      removeCompleted() {
        this[M.SET_TODOS]({payload: {todos: filters.active(this.todos(this.$route.params.id)), id: this.$route.params.id}});
      }
    },
    computed: {
      ...mapGetters('todo', {
        visibility: 'getVisibility',
        todos: 'getTodos'
      }),

      remaining: function () {
        return filters.active(this.todos(this.$route.params.id)).length
      }
    },
    filters: {
      pluralize: function (number, one, two, five) {
        let n = Math.abs(number);
        n %= 100;
        if (n >= 5 && n <= 20) {
          return five;
        }
        n %= 10;
        if (n === 1) {
          return one;
        }
        if (n >= 2 && n <= 4) {
          return two;
        }
        return five;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .footer-filters {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .filters {
    display: flex;
    justify-content: center;
    align-items: center;
    &-item {
      margin-right: 10px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  .footer-clear-all {
    display: flex;
    justify-content: flex-end;
  }
  @media (max-width: 500px) {
    .footer-filters {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
  }
</style>