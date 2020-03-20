
/**
 * 用户页面路由
 */

import Layout from '@/views/layout/Layout'

const userRouter = {
  path: '/users',
  component: Layout,
  redirect: '/user/info',
  name: 'User',
  meta: {
    title: '用户管理',
    icon: 'user'
  },
  children: [
    {
      path: 'users',
      component: () => import('@/views/user/user'),
      name: 'userList',
      meta: { title: '用户列表' }
    },
    {
      path: 'roles',
      component: () => import('@/views/user/role'),
      name: 'roleList',
      meta: { title: '角色列表' }
    },
    {
      path: 'urls',
      component: () => import('@/views/user/url'),
      name: 'urlList',
      meta: { title: '路由权限列表' }
    },
  ]
}
export default userRouter
