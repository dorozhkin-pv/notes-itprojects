import Router from 'vue-router';
import Vue from 'vue';

import Home from '@/pages/Home.vue';
import Todo from '@/pages/PageTodo.vue';
import PageNotFound from '@/pages/PageNotFound.vue';

import * as helpers from '@/helpers';
const { storageHandlers }  = helpers;

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { layout: 'main' }
  },
  {
    path: '/todo/:id',
    name: 'Todo',
    component: Todo,
    props: true,
    meta: { layout: 'main' }
  },
  {
    path: '*',
    name: 'NotFound',
    component: PageNotFound,
    meta: { layout: 'empty' }
  }
]

const router = new Router({
  mode: 'history',
  routes
});

router.beforeEach((to, from, next) => {
  let isNote = false;
  const notes = storageHandlers.inStorage();
  
  if (notes) isNote = notes.some(note => note.id === to.params.id);

  if (to.name === 'Todo' && !isNote) next({ name: 'NotFound', params: { '0': to.path } });
  else next();
})


export default router;