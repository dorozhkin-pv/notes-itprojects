import Vue from 'vue';
import * as M from './mutation_types';
import * as helpers from '@/helpers'
const { storageHandlers }  = helpers

export default {
  [M.SET_NOTES](state, {payload: notes}) {
    state.notes = notes;
  },

  [M.SET_NOTE](state, {payload: note}) {
    state.notes.push(note);
    storageHandlers.setStorage(state.notes);
  },

  [M.REMOVE_NOTE](state, {payload: id}) {
    state.notes = state.notes.filter(note => note.id !== id);
    storageHandlers.setStorage(state.notes);
  },

  [M.SET_NOTE_TITLE](state, {payload: {noteId, title}}) {
    const note = state.notes.find(note => note.id === noteId);
    note.tempTitle = title;
  },

  [M.SET_TODOS](state, {payload: {todos, id}}) {
    const note = state.notes.find(note => note.id === id);        //
    note.tempTodos = todos;
  },

  [M.REMOVE_TODO](state, {payload: {noteId, todoId}}) {
    const note = state.notes.find(note => note.id === noteId);
    note.tempTodos = note.tempTodos.filter(todo => todo.id !== todoId);   //
  },

  [M.SET_EDITED_TODO](state, {payload: todo}) {
    state.editedTodo = todo;
  },

  [M.SET_TODO_TITLE](state, {payload: {noteId, todoId, title}}) {
    const note = state.notes.find(note => note.id === noteId);
    const todo = note.tempTodos.find(todo => todo.id === todoId);     //
    todo.title = title;
  },

  [M.ADD_TODO](state, {id, todo}) {
    const note = state.notes.find(note => note.id === id);        //
    note.tempTodos.push(todo);
  },

  [M.SET_VISIBILITY](state, {payload: value}) {
    state.visibility = value;
  },

  [M.CREATE_TEMP_TODOLIST](state, {payload: {id}}) {
    const note = state.notes.find(note => note.id === id);
    note.tempTitle = note.title;
    Vue.set(note, 'tempTodos', [...note.todos]);
  },

  [M.SAVE_NOTE](state, {payload: {id}}) {
    const note = state.notes.find(note => note.id === id);
    note.title = note.tempTitle;
    note.todos = [...note.tempTodos];
    storageHandlers.setStorage(state.notes);
  },

  [M.UNDO_NOTE](state, {payload: {id}}) {
    const note = state.notes.find(note => note.id === id);
    if (state.undo) {
      note.undoTodos = [...note.tempTodos];
      note.tempTodos = [...note.todos];
      state.undo = false;
    } else {
      note.tempTodos = [...note.undoTodos];
      state.undo = true;
    }
  },

  [M.SHOW_MODAL](state, {payload: {showModal, modalText, modalCallBack}}) {
    state.showModal = showModal;
    state.modalText = modalText;
    state.modalCallBack = modalCallBack;
  }
}