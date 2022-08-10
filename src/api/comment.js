import { request } from '@/utils/request'

export const getArticleCommentsApi = (params) =>
  request({
    url: '/v1_0/comments',
    params
  })

export const postCommentsApi = (data) =>
  request({
    url: '/v1_0/comments',
    method: 'POST',
    data
  })
