/* eslint-disable @typescript-eslint/no-explicit-any */


import instance from './request'
import {Ilogin,IFormRegisterState} from '../TypeInterface/loginInterface'



export function login(res:Ilogin ):any {
    return instance({
        url: '/login',
        method: 'post',
        data:res
    })
}



export function loginGet(res:Ilogin ):any {
    return instance({
        url: '/login',
        method: 'get',
        params:res
    })
}

export function register(res:IFormRegisterState ):any {
    return instance({
        url: '/register',
        method: 'post',
        data:res
    })
}

// export function getGoodsByType_Mock(type = "sales", page = 1) {
//     return request({
//         //url: '/getGoodsByType?' + `type=${type}` + `&page=${page}`,
//         url: '/getGoodsByType',
//         method: 'get',
//         params: { type: type, page: page }
//     })
// }

// export function getGoods_Mock() {
//     return request({
//         url: '/getGoods',
//         method: 'get',
//         params: {}
//     })
// }

// export function login_Mock() {
//     let LoginData = { email: "admin@lmonkey.com", password: "admin123456" };
//     return HttpRequest({
//         url: '/login',
//         method: 'POST',
//         data: LoginData
//     })
// }