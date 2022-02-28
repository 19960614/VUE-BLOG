import Vue from 'vue';
import VueRouter from 'vue-router';
import { info } from '@/api/user.js';
import store from '@/store/index.js';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import Managerial from '@/views/Managerial.vue';
import ManagerialHome from '@/views/ManagerialHome.vue';
import Publish from '@/views/Publish.vue';
import Edit from '@/views/Edit.vue';
import ImageRanger from '@/views/ImageRanger.vue';
import Setting from '@/views/Setting.vue';
import Customer from '@/views/Customer.vue';
import CustomerHome from '@/views/CustomerHome.vue';
import BlogArticle from '@/views/BlogArticle.vue';
import BlogArticleContent from '@/views/BlogArticleContent.vue';
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
      { path: '/managerialHome', component: ManagerialHome, meta: { auth: true } }, //首页
      { path: '/publish', component: Publish, meta: { auth: true } }, //文章发表
      { path: '/edit', component: Edit, meta: { auth: true } }, //文章编辑
      { path: '/imageRanger', component: ImageRanger, meta: { auth: true } }, //照片管理
      { path: '/setting', component: Setting, meta: { auth: true } }, //个人设置
      { path: '', component: ManagerialHome, meta: { auth: true } }, //默认进入首页
    ]
  },
  {
    path: '/customer',
    component: Customer,
    meta: { auth: true },
    children: [
      { path: '/customerHome', component: CustomerHome, meta: { auth: true } }, //首页
      { path: '/blogArticle', component: BlogArticle, meta: { auth: true } }, //文章展示
      { path: '/blogArticleContent/:id', component: BlogArticleContent, meta: { auth: true } }, //文章内容
      { path: '', component: CustomerHome, meta: { auth: true } } //默认进入首页
    ]
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
        store.commit('setusername', res.data.username); //将username存入vuex
        if (to.matched[0].path === '/managerial') { //如果进入管理平台要验证是否是管理员账号
          if (res.data.username === 'admin123') {
            next();
          }
          else {
            next('/login'); //非管理员返回登录界面
          }
        }
        else {
          next();
        }
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
