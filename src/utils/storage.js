class Storage {
  get(key) {
    const value = localStorage.getItem(key)
    // getItem(key:string):string
    // JSON.parse() 只能转换json格式的字符串
    try {
      return JSON.parse(value) // 如果正确转换，证明value是json字符串，报错证明不是，直接返回value
    } catch (error) {
      return value
    }
  }
  set(key, value) {
    if (typeof value === 'object' && value !== null) {
      value = JSON.stringify(value)
    }
    // value不是对象
    localStorage.setItem(key, value)
  }
  remove(key) {
    localStorage.removeItem(key)
  }
}
export default new Storage()
