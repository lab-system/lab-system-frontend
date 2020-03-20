import request from '@/utils/request'


// 商品列表
export function getAllGoods(params) {
  return request({
    url: '/goods/allGoods',
    method: 'get',
    params
  })
}

// 获取购物车列表
export function getCartList(params) {
  return request({
    url: '/member/cartList',
    method: 'post',
    params
  })
}

// 加入购物车
export function addCart(params) {
  return request({
    url: '/member/addCart',
    method: 'post',
    params
  })
}

// 删除购物车
export function delCart(params) {
  return request({
    url: '/member/delCart',
    method: 'post',
    params
  })
}

// 删除购物车勾选商品
export function delCartChecked(params) {
  return request({
    url: '/member/delCartChecked',
    method: 'post',
    params
  })
}

// 编辑购物车
export function cartEdit(params) {
  return request({
    url: '/member/cartEdit',
    method: 'post',
    params
  })
}

// 全选
export function editCheckAll(params) {
  return request({
    url: '/member/editCheckAll',
    method: 'post',
    params
  })
}

// 删除整条购物车
export function cartDel(params) {
  return request({
    url: '/member/cartDel',
    method: 'post',
    params
  })
}

// 获取用户地址
export function addressList(params) {
  return request({
    url: '/member/addressList',
    method: 'post',
    params
  })
}

// 通过id获取地址
export function getAddress(params) {
  return request({
    url: '/member/address',
    method: 'post',
    params
  })
}

// 修改收货地址
export function addressUpdate(params) {
  return request({
    url: '/member/updateAddress',
    method: 'post',
    params
  })
}

// 添加收货地址
export function addressAdd(params) {
  return request({
    url: '/member/addAddress',
    method: 'post',
    params
  })
}

// 删除收货地址
export function addressDel(params) {
  return request({
    url: '/member/delAddress',
    method: 'post',
    params
  })
}

// 生成订单
export function submitOrder(params) {
  return request({
    url: '/member/addOrder',
    method: 'post',
    params
  })
}

// 支付
export function payMent(params) {
  return request({
    url: '/member/payOrder',
    method: 'post',
    params
  })
}

// 获取用户订单
export function orderList(params) {
  return request({
    url: '/member/orderList',
    method: 'get',
    params
  })
}

// 获取单个订单详情
export function getOrderDet(params) {
  return request({
    url: '/member/orderDetail',
    method: 'get',
    params
  })
}

// 取消订单
export function cancelOrder(params) {
  return request({
    url: '/member/cancelOrder',
    method: 'post',
    params
  })
}

// 商品详情
export function productDet(params) {
  return request({
    url: '/goods/productDet',
    method: 'get',
    params
  })
}

// 删除订单
export function delOrder(params) {
  return request({
    url: '/member/delOrder',
    method: 'get',
    params
  })
}

// 商品列表
export function getSearch(params) {
  return request({
    url: '/goods/search',
    method: 'get',
    params
  })
}

// 快速搜索
export function getQuickSearch(params) {
  return request({
    url: '/goods/quickSearch',
    method: 'get',
    params
  })
}

