import Vue from 'vue';
import VueRouter from 'vue-router';
import { info } from '@/api/user.js';
import store from '@/store/index.js';
import Login from '@/views/Login.vue'; //登录
import Register from '@/views/Register.vue'; //注册
import Managerial from '@/views/Managerial.vue'; //管理系统
import ManagerialHome from '@/views/ManagerialHome.vue'; //管理系统首页
import Publish from '@/views/Publish.vue'; //管理系统文章发布
import Edit from '@/views/Edit.vue'; //管理系统编辑文章
import ImageRanger from '@/views/ImageRanger.vue'; //管理系统相册管理
import Setting from '@/views/Setting.vue'; //管理系统个人信息设置
import Customer from '@/views/Customer.vue'; //客户端
import CustomerHome from '@/views/CustomerHome.vue'; //客户端首页
import BlogArticle from '@/views/BlogArticle.vue'; //客户端文章页
import BlogArticleContent from '@/views/BlogArticleContent.vue'; //客户端文章内容
import MyPhotos from '@/views/MyPhotos.vue'; //客户端我的照片
import NotFound from '@/views/NotFound.vue'; //404

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
      { path: '/managerialHome', component: ManagerialHome, meta: { auth: true } },
      { path: '/publish', component: Publish, meta: { auth: true } },
      { path: '/edit', component: Edit, meta: { auth: true } },
      { path: '/imageRanger', component: ImageRanger, meta: { auth: true } },
      { path: '/setting', component: Setting, meta: { auth: true } },
      { path: '', component: ManagerialHome, meta: { auth: true } },
    ]
  },
  {
    path: '/customer',
    component: Customer,
    meta: { auth: true },
    children: [
      { path: '/customerHome', component: CustomerHome, meta: { auth: true } },
      { path: '/blogArticle', component: BlogArticle, meta: { auth: true } },
      { path: '/blogArticleContent/:id', component: BlogArticleContent, meta: { auth: true } },
      { path: '/myPhotos', component: MyPhotos, meta: { auth: true } },
      { path: '', component: CustomerHome, meta: { auth: true } }
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

router.beforeEach((to, from, next) => { //守卫
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
      else { //token不正确进入login
        next('/login');
      }
    })
  }
  else {  //登录注册不需要token
    next();
  }
})

export default router;
