import request from '@/utils/request'

// 周报列表
export function getReportList(params) {
  return request({
    url: '/reports/report/',
    method: 'get',
    params: params
  })
}

// 创建周报
export function createReport(data) {
  return request({
    url: 'reports/report/',
    method: 'post',
    data: data
  })
}

// 获取周报详情
export function getReportDetail(id) {
  return request({
    url: '/reports/report/' + id + '/',
    method: 'get'
  })
}

// 编辑周报
export function updateReport(id, data) {
  return request({
    url: '/reports/report/' + id + '/',
    method: 'put',
    data: data
  })
}

// 部分修改
export function partUpdateReport(id, data) {
  return request({
    url: '/reports/report/' + id + '/',
    method: 'patch',
    data: data
  })
}

// 删除周报
export function deleteReport(id) {
  return request({
    url: '/reports/report/' + id + '/',
    method: 'delete'
  })
}


