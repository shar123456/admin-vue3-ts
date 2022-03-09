import instance from './request'

export function GetUserColumn():any {
    return instance({
        url: '/UserListColumn',
        method: 'get',
        params:{}
    })
}
export function GetUserDatas(param:any):any {
    return instance({
        url: '/UserDatas',
        method: 'post',
        data:param
    })
}
