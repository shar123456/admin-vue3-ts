module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '' : '/', // 根域上下文目录
    outputDir: 'dist', // 构建输出目录
    lintOnSave: false, // 是否开启eslint保存检测，有效值：ture | false | 'error'
    devServer: {
        open: false,
        host: 'localhost',
        port: 8858,
        https: false,
        hotOnly: false,
        // proxy: { // 配置跨域
        //     '/api': {
        //         target: '', //接口域名
        //         ws: true, //是否代理websockets
        //         changOrigin: true, //是否跨域
        //         pathRewrite: { //重置路径
        //             '^/api': ''
        //         }
        //     }
        // },

    },
    css: {
        loaderOptions: {
            scss: {
                prependData: `@import "@/styles/globlemain.scss";` //引入全局变量   

            }
        }
    }
}