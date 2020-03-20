/**
 *  全局登录 以及权限获取设置
 */

import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getToken } from '@/utils/auth' // getToken from cookie

NProgress.configure({showSpinner: false})// NProgress Configuration

// permission judge function
function hasPermission(roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true // admin permission passed directly
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

const whiteList = ['/login', '/auth-redirect', '/register', '/resetpwd', '/404', '/401', '/502', '/', '/home', '/goods', '/goodsDetails', '/thanks', '/search', '/refreshsearch', '/refreshgoods']// no redirect whitelist

router.beforeEach((to, from, next) => {
  console.log('to', to)
  console.log('from', from)
  console.log('next', next)
  NProgress.start() // start progress bar
  if (getToken()) { // determine if there has token
    /* has token*/
    console.log('token', getToken())
    if (to.path === '/login') {
      next({ path: '/dash' })
      // next()
      console.log('登录页')
      NProgress.done()
    } else {
      if (store.getters.username.length === 0) { // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetUserInfo').then(res => { // 拉取user_info
          console.log('获取到了用户信息')
          const roles = res.roles // note: roles must be a array! such as: ['editor','develop']
          const urls = store.getters.urls
          store.dispatch('GenerateRoutes', {roles, urls}).then(() => { // 根据roles权限生成可访问的路由表
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            next({...to, replace: true}) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          })
        }).catch((err) => {
          console.log('获取用户信息出错')
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || 'Verification failed, please login again')
            next({ path: '/login' })
            // next({ path: '/502' })
          })
        })
      } else {
        // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        if (hasPermission(store.getters.roles, to.meta.roles)) {
          next()
        } else {
          next({path: '/401', replace: true, query: {noGoBack: true}})
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      console.log('在白名单')
      next()
    } else {
      console.log('未获取到token，且不在白名单')
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
