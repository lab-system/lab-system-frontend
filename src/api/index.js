import request from '@/utils/request'

// 登陆
export function userLogin(params) {
  return request({
    url: '/member/login',
    method: 'post',
    params
  })
}

// 退出登陆
export function loginOut(params) {
  return request({
    url: '/member/loginOut',
    method: 'get',
    params
  })
}

// 用户信息
export function userInfo(params) {
  return request({
    url: '/member/checkLogin',
    method: 'get',
    params
  })
}

// 注册账号
export function register(params) {
  return request({
    url: '/member/register',
    method: 'get',
    params
  })
}

// 上传图片
export function upload(params) {
  return request({
    url: '/member/imgaeUpload',
    method: 'post',
    params
  })
}

// 修改头像
export function updateheadimage(params) {
  return request({
    url: '/member/updateheadimage',
    method: 'post',
    params
  })
}

// 捐赠列表
export function thanksList(params) {
  return request({
    url: '/member/thanks',
    method: 'get',
    params
  })
}

// 首页接口
export function productHome(params) {
  return request({
    url: '/goods/home',
    method: 'get',
    params
  })
}

// 首页接口
export function navList(params) {
  return request({
    url: '/goods/navList',
    method: 'get',
    params
  })
}

// 推荐板块
export function recommend(params) {
  return request({
    url: '/goods/recommend',
    method: 'get',
    params
  })
}

// 捐赠板块
export function thank(params) {
  return request({
    url: '/goods/thank',
    method: 'get',
    params
  })
}

// 极验验证码
export function geetest(params) {
  return request({
    url: '/member/geetestInit?t=' + (new Date()).getTime(),
    method: 'get',
    params
  })
}

