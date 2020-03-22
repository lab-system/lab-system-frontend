import request from '@/utils/request'

// 项目列表
export function getProjectList(params) {
  return request({
    url: '/projects/project/',
    method: 'get',
    params: params
  })
}

// 创建项目
export function createProject(data) {
  return request({
    url: 'projects/project/',
    method: 'post',
    data: data
  })
}

// 获取项目详情
export function getProjectDetail(id) {
  return request({
    url: '/projects/project/' + id + '/',
    method: 'get'
  })
}

// 编辑项目
export function updateProject(id, data) {
  return request({
    url: '/projects/project/' + id + '/',
    method: 'put',
    data: data
  })
}

// 部分修改
export function partUpdateProject(id, params) {
  return request({
    url: '/projects/project' + id + '/',
    method: 'patch',
    params
  })
}

// 删除项目
export function deleteProject(id) {
  return request({
    url: '/projects/project/' + id + '/',
    method: 'delete'
  })
}


