module.exports = {
  publicPath: './',            // 公共,基本路径

  // 输出文件目录，不同的环境打不同包名
  outputDir: process.env.NODE_ENV === "development" ? 'devdist' : 'dist',
  assetsDir: 'static',        // 默认会在目录同时生成三个静态目录：js,css,img
  lintOnSave: true,          // 关闭eslint代码检查
  filenameHashing: false,     // 生成的静态资源名, 默认加了hash, 命名.后面的为hash：chunk-2d0aecf8.71e621e9
  productionSourceMap: false,  // 生产环境下css 分离文件, sourceMap 文件
  css: {
    extract: true,      // 是否使用css分离插件 ExtractTextPlugin
    sourceMap: false,   // 开启 CSS source maps        
    modules: false,     // 启用 CSS modules for all css / pre-processor files.
    // css 预设器配置项
    loaderOptions: {
      sass: {
        prependData: `@import "./src/styles/main.scss";`
      }
    }
  },
  devServer: {
    port: 8080,
    host: "localhost",   // 0.0.0.0
    open: true,          // 配置自动启动浏览器
    https: false,
    hotOnly: false,
    overlay: {
      warnings: true,
      errors: true
    },
    //  配置代理,解决跨域的问题, 只有一个代理
    // proxy: null,
    // proxy: 'http://api.mc.com',

    // proxy: {
    //     "/api": {
    //         target: "http://api.mc.com",
    //         changeOrigin: true
    //     },
    //     "/foo": {
    //         target: ""
    //     }
    // },
    before: app => { },     // 第三方插件
  }
}
