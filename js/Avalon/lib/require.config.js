require.config({//第一块，配置
    baseUrl: '',
    paths: {
        avalon: ["lib//avalon"],//必须修改源码，禁用自带加载器，或直接删提AMD加载器模块
        mmHistory: 'lib//mmHistory',
        mmRouter: 'lib//mmRouter',
    }
});