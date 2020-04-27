<template>
  <div class="container">
    <section class="todoapp">
      <div class="container">
        <div :class="{ editing: note.id === ( editedTodo ? editedTodo.id : null ) }">
          <h1 class="view" @click="editTodo(note)">{{ note.tempTitle }}</h1>
          <div class="row edit">
            <div class="input-field col s12">
              <base-input  
                  ref="baseInput"
                  :value="note.title"
                  @blur="cancelEdit(note)"
                  @keyup:esc="cancelEdit(note)"
                  @keyup:enter="doneEdit(note, $event)"/>
            </div>
          </div>
        </div>

        <header-component />
        <content-component />
        <footer-component />
        <hr>
        <div class="note-actions">
          <button class="yellow accent-4 waves-effect waves-light btn" @click="undo">Undo</button>
          <button class="light-blue lighten-1 waves-effect waves-light btn" @click="cancelEditNote">Cancel Edit</button>
          <button class="green lighten-1 waves-effect waves-light btn" @click="save">Save</button>
          <button class="red lighten-1 waves-effect waves-light btn" @click="removeNote">Remove</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import HeaderComponent from '@/components/HeaderComponent/';
  import FooterComponent from '@/components/FooterComponent/';
  import ContentComponent from '@/components/ContentComponent/';

  import {mapGetters, mapMutations} from 'vuex';
  import * as M from '@/store/todo/mutation_types.js';

  export default {
    name: 'PageTodo',

    components: {
      HeaderComponent,
      FooterComponent,
      ContentComponent
    },

    created() {
      this[M.CREATE_TEMP_TODOLIST]({ payload: { id: this.$route.params.id } });
    },

    methods: {
      ...mapMutations('todo', [
        M.SET_EDITED_TODO,
        M.SET_NOTE_TITLE,
        M.REMOVE_NOTE,
        M.CREATE_TEMP_TODOLIST,
        M.SAVE_NOTE,
        M.UNDO_NOTE,
        M.SHOW_MODAL
      ]),
      editTodo(note) {
        this.beforeEditCache = note.title;
        this[M.SET_EDITED_TODO]({ payload: note });
      },
      doneEdit(note, value) {
        if (!this.editedTodo || value.trim() == '') {
          return;
        }
        this[M.SET_EDITED_TODO]({ payload: null });
        this[M.SET_NOTE_TITLE]({payload: {noteId: note.id, title: value.trim()}});
      },
      cancelEdit(note) {
        this[M.SET_EDITED_TODO]({ payload: null });
        this[M.SET_NOTE_TITLE]({payload: {noteId: note.id, title: this.beforeEditCache}});
        this.$refs.baseInput.refreshInnerValue();
      },
      removeNote() {
        this[M.SHOW_MODAL]({payload: {
          showModal: true,
          modalText: 'Вы действительно хотите удалить запись?',
          modalCallBack: () => {
            this[M.REMOVE_NOTE]({ payload: this.note.id });
            this.$message({text: 'Заметка успешно удалена'});
            this.$router.push({ name: 'Home' });
          }
        }});
      },
      cancelEditNote() {
        this[M.SHOW_MODAL]({payload: {
          showModal: true,
          modalText: 'Все несохраненные данные будут потеряны!',
          modalCallBack: () => {
            this.$router.push({ name: 'Home' });
          }
        }});
      },
      save() {
        this[M.SAVE_NOTE]({ payload: {id: this.note.id} });
        this.$message({ text: 'Заметка успешно сохранена' });
      },
      undo() {
        this[M.UNDO_NOTE]({ payload: {id: this.note.id} });
        this.$message({ text: 'UNDO' });
      }
    },

    computed: {
      ...mapGetters('todo', {
        editedTodo: 'getEditedTodo',
        currentNote: 'getNoteByid'
      }),
      note() {
        return this.currentNote(this.$route.params.id);
      }
    },
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
  .note-actions {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-bottom: 2rem;
    & button {
      margin-left: .75rem;
    }
  }
  @media (max-width: 500px) {
    .note-actions {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      & button {
        margin: 0;
        margin-bottom: 0.75rem;
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
</style>