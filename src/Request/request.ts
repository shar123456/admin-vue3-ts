import axios from 'axios'
enum messageEnum{
"操作成功"=200,
"密码错误"=400,
"账号错误"=202,
"请求异常"=901,

}
const instance = axios.create({
    //baseURL: '/api/',
    baseURL:process.env.VUE_APP_BASE_URL,
    timeout: 5000
})

//请求拦截
instance.interceptors.request.use(
    config => {
        //如果有一个接口需要认证token才可以访问，就在这统一设置
        const token=localStorage.getItem("starToken");
        config.headers.token=token;
        console.log("axios拦截")
        //直接放行
        return config;
    }, err => {console.log(err)}
)

//响应拦截
instance.interceptors.response.use(
    res => {
      const result=  res.data ? res.data : res;
      const code:number=result.code;
        if(code!=200)
        {
            ///alert(messageEnum[code]);
            return Promise.reject(result);
        }else
        {
            return res.data;
        }

        
    }, err => {
        console.log(err)
        //如果有需要授权才可以访问的接口，统一去login授权
        //如果有错误，这里面会去处理，显示错误信息
    }
)


export default instance;