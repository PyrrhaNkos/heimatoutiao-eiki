import { request } from '@/utils/request'

export const getMyChannel = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}

/**
 * 获取所有频道
 * @returns Promise
 */
export const getAllChannels = () =>
  request({
    url: '/v1_0/channels'
  })

/**
 * 删除用户指定的频道
 * @param {*} id 频道的id
 * @returns Promise
 */
export const delChannel = (id) =>
  request({
    url: `/v1_0/user/channels/${id}`,
    method: 'DELETE'
  })
