import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import Managerial from '@/views/Managerial.vue';
import Customer from '@/views/Customer.vue';
import NotFound from '@/views/NotFound.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/managerial',
    component: Managerial
  },
  {
    path: '/customer',
    component: Customer
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '*',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
