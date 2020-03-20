/**
 * 路由 index
 */

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'
import userRouter from './modules/user'
/** note: Submenu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
 **/

const Index = () => import('@/page/index')
// const Login = () => import('@/page/Login/login')
// const Login = () => import('@/views/login/index')
// const Register = () => import('@/page/Login/register')
const Home = () => import('@/page/Home/home')
const GoodS = () => import('@/page/Goods/goods')
const goodsDetails = () => import('@/page/Goods/goodsDetails')
const Cart = () => import('@/page/Cart/cart')
const order = () => import('@/page/Order/order')
// const user = () => import('@/page/User/user')
// const orderList = () => import('@/page/User/children/order')
// const information = () => import('@/page/User/children/information')
// const addressList = () => import('@/page/User/children/addressList')
// const coupon = () => import('@/page/User/children/coupon')
// const aihuishou = () => import('@/page/User/children/aihuishou')
// const support = () => import('@/page/User/children/support')
const checkout = () => import('@/page/Checkout/checkout')
const payment = () => import('@/page/Order/payment')
const paysuccess = () => import('@/page/Order/paysuccess')
const Thanks = () => import('@/page/Thanks/thanks')
const Search = () => import('@/page/Search/search')
const RefreshSearch = () => import('@/page/Refresh/refreshsearch')
const RefreshGoods = () => import('@/page/Refresh/refreshgoods')
// const orderDetail = () => import('@/page/User/children/orderDetail')
const Alipay = () => import('@/page/Order/alipay')
const Wechat = () => import('@/page/Order/wechat')
const QQpay = () => import('@/page/Order/qqpay')

export const constantRouterMap = [

  {
    path: '',
    component: Index,
    hidden: true,
    name: 'index',
    redirect: '/home',
    children: [
      { path: 'home', component: Home, hidden: true },
      { path: 'goods', component: GoodS, hidden: true },
      { path: 'goodsDetails', name: 'goodsDetails', component: goodsDetails, hidden: true },
      { path: 'thanks', name: 'thanks', component: Thanks, hidden: true },
      { path: '/refreshgoods', name: 'refreshgoods', component: RefreshGoods, hidden: true }
    ]
  },
  // { path: '/login', name: 'login', component: Login, hidden: true },
  // { path: '/register', name: 'register', component: Register, hidden: true },
  { path: '/cart', name: 'cart', component: Cart, hidden: true },
  { path: '/refreshsearch', name: 'refreshsearch', component: RefreshSearch, hidden: true },
  {
    path: '/order',
    name: 'order',
    component: order,
    hidden: true,
    children: [
      { path: 'paysuccess', name: 'paysuccess', component: paysuccess, hidden: true },
      { path: 'payment', name: 'payment', component: payment, hidden: true },
      { path: '/search', name: 'search', component: Search, hidden: true },
      { path: 'alipay', name: 'alipay', component: Alipay, hidden: true },
      { path: 'wechat', name: 'wechat', component: Wechat, hidden: true },
      { path: 'qqpay', name: 'qqpay', component: QQpay, hidden: true }
    ]
  },
  // {
  //   path: '/user',
  //   name: 'user',
  //   component: user,
  //   redirect: '/user/orderList',
  //   hidden: true,
  //   children: [
  //     { path: 'orderList', name: '订单列表', component: orderList, hidden: true },
  //     { path: 'orderDetail', name: '订单详情', component: orderDetail, hidden: true },
  //     { path: 'information', name: '账户资料', component: information, hidden: true },
  //     { path: 'addressList', name: '收货地址', component: addressList, hidden: true },
  //     { path: 'coupon', name: '我的优惠', component: coupon, hidden: true },
  //     { path: 'support', name: '售后服务', component: support, hidden: true },
  //     { path: 'aihuishou', name: '以旧换新', component: aihuishou, hidden: true }
  //   ]
  // },
  { path: '/checkout', name: 'checkout', component: checkout, hidden: true },
  // { path: '*', redirect: '/home', hidden: true },

  // todo: 原生
 {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/user/login/index'),
    hidden: true
  },
  {
    path: '/resetpwd',
    component: () => import('@/views/user/resetpwd'),
    hidden: true
  },
  {
    path: '/user',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/user/resetpwd',
        component: () => import('@/views/user/pwdreset'),
        name: 'resetPassword',
        meta: {title: 'userResetPwd'}
      },
      {
        path: '/user/changepwd',
        component: () => import('@/views/user/pwdchange'),
        name: 'changePassword',
        meta: {title: 'userChangePwd'}
      },
      {
        path: '/user/info',
        component: () => import('@/views/user/info'),
        name: 'userinfo',
        meta: {title: 'userInfo'}
      },
    ]
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/user/login//authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '/502',
    component: () => import('@/views/errorPage/502'),
    hidden: true
  },
  {
    path: '/dash',
    component: Layout,
    redirect: '/dash/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', noCache: true }
      }
    ]
  }
  // {
  //   path: '/dashboard',
  //   component: () => import('@/views/dashboard/index'),
  //   name: 'Dashboard',
  //   meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
  // }
]

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  userRouter,
  { path: '*', redirect: '/404', hidden: true }
]
