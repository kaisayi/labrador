import Vue from 'vue';
import Router from 'vue-router';

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout';

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },

  {
    path: '/blog',
    component: Layout,
    redirect: '/blog/list',
    name: 'Blog',
    meta: { title: '功能管理', icon: 'example' },
    children: [
      {
        path: 'create',
        name: 'New Blog',
        component: () => import('@/views/blog/create'),
        meta: { title: '新增博客', icon: 'edit' }
      },
      {
        path: 'list',
        name: 'BlogList',
        component: () => import('@/views/blog/list'),
        meta: { title: '博客gallery', icon: 'list' }
      },
      {
        path: 'tags',
        name: 'BlogTags',
        component: () => import('@/views/tree/index'),
        meta: { title: '标签管理', icon: 'tag' }
      }
    ]
  },
  {
    path: '/gathering',
    component: Layout,
    name: 'System',
    meta: { title: '系统管理', icon: 'setting' },
    children: [
      {
        path: 'index',
        name: 'Form1',
        component: () => import('@/views/table/gathering'),
        meta: { title: '系统配置', icon: 'system' }
      },
      {
        path: 'index',
        name: 'Form2',
        component: () => import('@/views/table/gathering'),
        meta: { title: '修改密码', icon: 'form' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
