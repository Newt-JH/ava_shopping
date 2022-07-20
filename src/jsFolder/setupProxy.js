const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function(app){
  app.use(
    createProxyMiddleware("/api",{ //도메인 api로 호출
      target:"http://localhost:3000", // 통신할 서버의 도메인 주소
      changeOrigin:true,
    })
  )
}