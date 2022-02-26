import Vue from 'vue';
import VueRouter from 'vue-router';
import { info } from '@/api/user.js';
import store from '@/store/index.js';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import Managerial from '@/views/Managerial.vue';
import Home from '@/views/Home.vue';
import Publish from '@/views/Publish.vue';
import Edit from '@/views/Edit.vue';
import ImageRanger from '@/views/ImageRanger.vue';
import Setting from '@/views/Setting.vue';
import Customer from '@/views/Customer.vue';
import NotFound from '@/views/NotFound.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    component: Login,
    meta: { auth: false }
  },
  {
    path: '/register',
    component: Register,
    meta: { auth: false },
  },
  {
    path: '/managerial',
    component: Managerial,
    meta: { auth: true },
    children: [
      { path: '/home', component: Home, meta: { auth: true } }, //首页
      { path: '/publish', component: Publish, meta: { auth: true } }, //文章发表
      { path: '/edit', component: Edit, meta: { auth: true } }, //文章编辑
      { path: '/imageRanger', component: ImageRanger }, //照片管理
      { path: '/setting', component: Setting, meta: { auth: true } }, //个人设置
      { path: '', component: Home, meta: { auth: true } }, //个人设置
    ]
  },
  {
    path: '/customer',
    component: Customer,
    meta: { auth: true }
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

router.beforeEach((to, from, next) => {
  if (to.meta.auth) {  //需要权限的
    info().then((res) => {
      if (res.data.errcode === 0) {  //token是正确的,往下走
        store.commit('setusername', res.data.username);
        next();
      }
      else { //不正确进入login
        next('/login');
      }
    })
  }
  else {  //登录注册不需要token
    next();
  }
})

export default router;
