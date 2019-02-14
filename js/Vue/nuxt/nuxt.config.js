const pkg = require('./package')
const path = require('path')



module.exports = {
    mode: 'universal',

    /*
     ** Headers of the page
     */
    head: {
        title: pkg.name,
        titleTemplate: '%s - Nuxt.js',
        meta: [
            {charset: 'utf-8'}, 
            {name: 'viewport',                              content: 'width=device-width, initial-scale=1'},
            {name: 'description',                           content: pkg.description      },
            {name: 'apple-mobile-web-app-capable',          content: 'yes'},
            {name: 'apple-mobile-web-app-status-bar-style', content: 'black'},
            {name: 'format-detection',                      content: 'telephone=no'},
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
        ]
    },

    /*
     ** Customize the progress-bar color
     */
    loading: '~/components/loading.vue',

    /*
     ** Global CSS
     */
    css: [
        'assets/elementUI.css',
        'assets/main.scss'
    ],

    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        '~/plugins/index'
    ],

    /*
     ** Nuxt.js modules
     */
    modules: [],

    /*
     ** Build configuration
     */
    build: {
        /*
         ** You can extend webpack config here
         */
        extend(config, ctx) {
            Object.assign(config.resolve.alias, {   // 添加路径别名
              'utils': path.resolve(__dirname, 'utils')
            })
        },
        vendor: [
            'axios', // 另外一个页面内也引用了 axios，那么在应用打包发布的时候 axios 会被打包多次
            '~/plugins/index'
        ]
    },
    router: {
        base: '/',
        middleware: ['stats', 'acth'], // 使用中间件
        extendRoutes(routes, resolve) { // 生成的router  扩展配置
            routes.push({
                name: 'default',
                path: '/',
                component: resolve(__dirname, 'pages/user/one.vue')
            })
        }
    },



    buildDir: '.nuxt',      // npm run dev    输出(.nuxt -> .output)
    generate: {
         // dir: 'dist'          // npm run generate    输出dist
         dir: 'C:/Users/Administrator/Desktop/dist'          // npm run generate    输出dist
    },
    server: {
         port: 3000,        // 设置端口
         host: 'localhost'
    },


    proxy: {
        '/api': {
            target: 'http://localhost:81', //这个网站是开源的可以请求到数据的
            pathRewrite: {
                '^/api/': '/',
                changeOrigin: true
            }
        }
    },
}


