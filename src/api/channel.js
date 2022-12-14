import { request } from '@/utils/request'
import storage from '@/utils/storage'

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

/**
 * 添加频道
 * @param {*} id 频道id
 * @param {*} seq 插入的位置（数组索引）
 * @returns Promise
 */
export const addChannel = (id, seq) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [{ id, seq }]
    }
  })
}

// 未登录状态下，本地存储频道信息
const HEIMA_TOUTIAO_MY_CHANNELS = 'HEIMA_TOUTIAO_MY_CHANNELS'
export const setMyChannelsTolocal = (myChannels) => {
  storage.set(HEIMA_TOUTIAO_MY_CHANNELS, myChannels)
}

export const getMyChannelsBylocal = () => {
  return storage.get(HEIMA_TOUTIAO_MY_CHANNELS)
}
