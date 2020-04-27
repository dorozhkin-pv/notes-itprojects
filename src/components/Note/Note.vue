<template>
<div class="col s12 m6 l4 xl3">
  <div class="card teal">
    <div class="card-content white-text">
      <span class="card-title">{{ note.title }}</span>
      <div class="fixed-heigth" v-if="note.todos.length">
        <div v-for="todo in note.todos" :key="todo.id">
          <p>{{ todo.title }}</p>
        </div>
      </div>
      <div class="fixed-heigth" v-else>
        <p>Задач пока нет...</p>
      </div>
    </div>
    <div v-if="note.todos.length">
      <hr>
      <div class="white-text small-text">
        <p>Всего задач: {{ note.todos.length }}</p>
      </div>
      <hr>
    </div>
    <div v-else class="empty-div"></div>
    <div class="card-action">
      <router-link :to="{name: 'Todo', params: {id: note.id}}" 
                    class="btn-small waves-effect waves-light add"
      >
        <div>Редактировать</div>
        <font-awesome-icon class="plus" icon="plus-circle" />
      </router-link>
      <button class="btn-small red darken-4 waves-effect waves-light add" 
              @click="removeNote"
      >
        <div>Удалить</div>
        <font-awesome-icon class="plus" icon="plus-circle" />
      </button>
    </div>
  </div>
</div>
</template>

<script>
import { mapMutations, mapGetters} from 'vuex';
import * as M from '@/store/todo/mutation_types.js';

  export default {
    name: 'Note',

    props: {
      note: Object
    },

    methods: {
      ...mapMutations('todo', [ 
        M.REMOVE_NOTE,
        M.SHOW_MODAL 
      ]),
      removeNote() {
        this[M.SHOW_MODAL]({payload: {
          showModal: true,
          modalText: 'Вы действительно хотите удалить запись?',
          modalCallBack: () => {
            this[M.REMOVE_NOTE]({ payload: this.note.id });
            this.$message({text: 'Заметка успешно удалена'})
          }
        }});
      }
    }
  }
</script>

<style lang="scss" scoped>
  .fixed-heigth {
    height: 63px;
    overflow: hidden;
  }
  .card-action {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;
    & .add {
      margin-bottom: 0.5rem;
    }
  }
  .small-text {
    font-size: 0.9rem;
    padding-left: 1rem;
    p {
      margin: 0;
    }
  }
  .empty-div {
    height: 54px;
  }
</style>
