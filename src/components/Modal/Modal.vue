<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          
          <div class="modal-header">
            <h6>Подтвердите действие на странице</h6>
          </div>

          <div class="modal-body">
            {{ modalText }}
          </div>
          <hr>

          <div class="modal-footer">
            <button class="waves-effect waves-light btn-small" @click="okHandler">OK</button>
            <button class="red darken-1 waves-effect waves-light btn-small" @click="cancelHandler">Отмена</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapMutations, mapGetters} from 'vuex';
import * as M from '@/store/todo/mutation_types.js';

export default {
  name: 'Modal',

  methods: {
    ...mapMutations('todo', [
      M.SHOW_MODAL
    ]),
    closeModal() {
      this[M.SHOW_MODAL]({payload: {
        showModal: false,
        modalText: '',
        modalCallBack: null
      }});
    },
    okHandler() {
      this.modalCallBack();
      this.closeModal();
    },
    cancelHandler() {
      this.closeModal();
    }
  },

  computed: {
    ...mapGetters('todo', [
      'modalText',
      'modalCallBack'
    ])
  },
}
</script>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header {
  text-align: center;
  margin-bottom: 2rem;
}

.modal-body {
  margin: 20px 0;
}

.modal-footer {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 1rem;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>
