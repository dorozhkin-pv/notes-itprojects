import {filters} from '@/helpers';

export default {
  getNotes: state => state.notes,

  getNoteByid: state => id => {
    return state.notes.find(note => note.id === id);
  },

  getTodos: state => id => {
    const note = state.notes.find(note => note.id === id);  //
    return note.tempTodos;
  },
  
  getFilteredTodos: state => id => {
    const note = state.notes.find(note => note.id === id);  //
    return filters[state.visibility](note.tempTodos);
  },
  
  getTodosCount: (state, id) => {
    const note = state.notes.find(note => note.id === id);  //
    return note.todos.length;
  },

  getVisibility: state => state.visibility,

  getEditedTodo: state => state.editedTodo,

  showModal: state => state.showModal,
  modalText: state => state.modalText,
  modalCallBack: state => state.modalCallBack
}