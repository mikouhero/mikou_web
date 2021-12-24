const path = require('path')
module.exports = {
    lintOnSave: false,
    devServer: {
        port: 8080,
        proxy: { // 配置跨域
            '/api': {
                target: '',
                ws: true,
                changOrigin: true,    //是否开启代理
                //  pathRewrite: {
                //      '^/api': ''
                //  }
            }
        }
    },
    publicPath: './',
    configureWebpack: config => { // webpack配置，值位对象时会合并配置，为方法时会改写配置
        Object.assign(config, { // 开发生产共同配置
            resolve: {
                alias: {
                    '@': path.resolve(__dirname, './src')
                }
            }
        })
    }
};