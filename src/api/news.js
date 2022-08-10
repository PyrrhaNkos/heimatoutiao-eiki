import { request } from '@/utils/request'

/**
 * 获取文章
 * @param {*} id 频道的ID
 * @param {*} timestamp 请求第一页数据传当前的时间戳
 * @returns Promise
 */
export const getArticleApi = (id, timestamp) => {
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id: id,
      timestamp
    }
  })
}

export const getArticleDetailApi = (id) => {
  return request({
    url: `/v1_0/articles/${id}`
  })
}

export const addCollectionsApi = (id) =>
  request({
    url: '/v1_0/article/collections',
    method: 'POST',
    data: {
      target: id
    }
  })

export const cancelCollectionsApi = (id) =>
  request({
    url: `/v1_0/article/collections/${id}`,
    method: 'DELETE'
  })

export const addLikingsApi = (id) =>
  request({
    url: '/v1_0/article/likings',
    method: 'POST',
    data: {
      target: id
    }
  })

export const cancelLikingsApi = (id) =>
  request({
    url: `/v1_0/article/likings/${id}`,
    method: 'DELETE'
  })
