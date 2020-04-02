
/**
 * 项目管理页面路由
 */

import Layout from '@/views/layout/Layout'

const projectRouter = {
  path: '/projects',
  component: Layout,
  redirect: '/projects/project',
  alwaysShow: true,
  name: 'projectManage',
  meta: {
    // roles: 'admin',
    title: '项目管理',
    icon: 'cmdb'
  },
  children: [
    {
      path: 'project',
      component: () => import('@/views/project/project'),
      name: 'Project',
      meta: { title: '项目列表' }
    },
    {
      path: 'projectaudit',
      component: () => import('@/views/project/project_audit'),
      name: 'ProjectAudit',
      meta: { title: '项目审核'
        // roles: 'teacher'
      }
    }
  ]
}
export default projectRouter
