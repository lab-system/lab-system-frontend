
/**
 * 物品管理页面路由
 */

import Layout from '@/views/layout/Layout'

const goodRouter = {
  path: '/goods',
  component: Layout,
  redirect: '/goods/good',
  alwaysShow: true,
  name: 'goodManage',
  meta: {
    // roles: 'admin',
    title: '物品管理',
    icon: 'cmdb'
  },
  children: [
    {
      path: 'good',
      component: () => import('@/views/good/good'),
      name: 'Good',
      meta: { title: '物品列表' }
    },
    {
      path: 'goodborrow',
      component: () => import('@/views/good/goodborrow'),
      name: 'GoodBorrow',
      meta: { title: '物品借用' }
    },
    {
      path: 'goodaudit',
      component: () => import('@/views/good/good_audit'),
      name: 'GoodAudit',
      meta: { title: '物品审核'
        // roles: 'teacher'
      }
    }
  ]
}
export default goodRouter
