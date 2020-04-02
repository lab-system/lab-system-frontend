
/**
 * 周报管理页面路由
 */

import Layout from '@/views/layout/Layout'

const reportRouter = {
  path: '/reports',
  component: Layout,
  redirect: '/reports/report',
  alwaysShow: true,
  name: 'reportManage',
  meta: {
    // roles: 'admin',
    title: '周报管理',
    icon: 'cmdb'
  },
  children: [
    {
      path: 'report',
      component: () => import('@/views/report/report'),
      name: 'Report',
      meta: { title: '写周报' }
    },
    {
      path: 'reportlist',
      component: () => import('@/views/report/report_list'),
      name: 'ReportList',
      meta: { title: '周报列表'
        // roles: 'teacher'
      }
    }
  ]
}
export default reportRouter
