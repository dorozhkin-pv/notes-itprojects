<template>
  <div class="container">
    <section class="home">
      <h1>Мои заметки</h1>
      <button class="btn waves-effect waves-light btn-large add" @click="addNote">
        <div>Добавить</div>
        <font-awesome-icon class="plus" icon="plus-circle" />
      </button>
      <div class="row">
        <div v-for="note in getNotes" :key="note.id">
          <note :note="note" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Note from '@/components/Note';

import {mapGetters, mapMutations} from 'vuex';
import * as M from '@/store/todo/mutation_types.js';
import {makeNote} from '@/helpers';

export default {
  name: 'Home',

  components: {
    Note
  },

  data: () => ({

  }),

  methods: {
    ...mapMutations('todo', [ M.SET_NOTE ]),
    addNote() {
      this[M.SET_NOTE]({ payload: makeNote() })
    }
  },

  computed: {
    ...mapGetters('todo', [ 'getNotes' ])
  },
}
</script>

<style lang="scss" scoped>
.add {
  margin-left: .75rem;
}

.add-btn {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .plus {
    min-width: 25px;
    min-height: 25px;
    margin-left: 0.5rem;
  }
}
</style>