import axios from "axios";

export const request = axios.create({
    baseURL:'http://toutiao.itheima.net',
    timeout:5000
})