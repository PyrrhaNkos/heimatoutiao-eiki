import storage from '@/utils/storage'

const TOKEN = 'HEIMA_TOUTIAO_TOKEN'
const HEIMA_TOUTIAO_HISTORY = 'HEIMA_TOUTIAO_HISTORY'

export const getToken = () => storage.get(TOKEN)

export const setToken = (value) => storage.set(TOKEN, value)

export const removeToken = () => storage.removeItem(TOKEN)

export const getHistory = () => storage.get(HEIMA_TOUTIAO_HISTORY)

export const setHistory = (value) => storage.set(HEIMA_TOUTIAO_HISTORY, value)

export const removeHistory = () => storage.removeItem(HEIMA_TOUTIAO_HISTORY)
