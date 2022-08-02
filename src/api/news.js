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
