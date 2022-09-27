const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
//修改端口号
module.exports = {
  devServer: {
      // //代理axios
      // proxy: 'http://localhost:8089',
      //vue自己启动的端口
      // port:8080
      // open:true  // 启动后是否自动打开网页
  }
}