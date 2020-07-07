import request from '@/utils/request'

export function getArticleList(data) {
  return request({
    url: '/article/article/',
    method: 'get',
    params: data
  })
}

export function getMemberList(data){
  return request({
    url: '/members/member/',
    method: 'get',
    params: data
  })
}
