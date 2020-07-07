import request from '@/utils/request'

// 物品列表
export function getGoodList(id) {
  return request({
    url: '/goods/good/' + id + '/',
    method: 'get'
  })
}

export function getArticle(id) {
  return request({
    url: 'article/article' + id + '/',
    method: 'get'
  })
}

// 创建物品
export function createGood(data) {
  return request({
    url: 'goods/good/',
    method: 'post',
    data: data
  })
}

// 获取物品详情
export function getGoodDetail(id) {
  return request({
    url: '/goods/good/' + id + '/',
    method: 'get'
  })
}

// 编辑物品
export function updateGood(id, data) {
  return request({
    url: '/goods/good/' + id + '/',
    method: 'put',
    data: data
  })
}

// 部分修改
export function partUpdateGood(id, params) {
  return request({
    url: '/goods/good/' + id + '/',
    method: 'patch',
    params
  })
}

// 删除物品
export function deleteGood(id) {
  return request({
    url: '/goods/good/' + id + '/',
    method: 'delete'
  })
}

// 物品列表
export function getGoodBorrowList(params) {
  return request({
    url: '/goods/goodborrow/',
    method: 'get',
    params: params
  })
}

// 创建物品
export function createGoodBorrow(data) {
  return request({
    url: 'goods/goodborrow/',
    method: 'post',
    data: data
  })
}

// 获取物品详情
export function getGoodBorrowDetail(id) {
  return request({
    url: '/goods/goodborrow/' + id + '/',
    method: 'get'
  })
}

// 编辑物品
export function updateGoodBorrow(id, data) {
  return request({
    url: '/goods/goodborrow/' + id + '/',
    method: 'put',
    data: data
  })
}

// 部分修改
export function partUpdateGoodBorrow(id, data) {
  return request({
    url: '/goods/goodborrow/' + id + '/',
    method: 'patch',
    data: data
  })
}

// 删除物品
export function deleteGoodBorrow(id) {
  return request({
    url: '/goods/goodborrow/' + id + '/',
    method: 'delete'
  })
}
