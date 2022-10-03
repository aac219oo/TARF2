// 路由文件
import { createRouter, createWebHistory } from "vue-router";

import Home from '../views/Home.vue'

const routes = [{
  path: '/',
  name: 'Home',
  component: Home
}]

const router = createRouter({
  history: createWebHistory(),
  routes
})


router.beforeEach((to, from) => {
  // if(to.meta.requireAuth) {
  //     let token = localStorage.getItem('auth-system-token');
  //     let isLogin = localStorage.getItem('auth-system-login');
  //     if(!token||!isLogin){
  //         return {
  //             path: '/login'
  //         }
  //     }
  // }
})

export default router;
