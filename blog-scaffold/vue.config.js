//反向代理
module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true, //express拿到8080请求头信息
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}