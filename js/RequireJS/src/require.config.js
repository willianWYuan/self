// define (function(){
	require.config({
		baseUrl: './src/js',   //更改根目录
	    paths: { 
	    	'jquery': './lib/jquery',
	    	'bootstrap': './lib/bootstrap',
	    	'text': './lib/text',   //属于跨越请求
	    	//'css': './lib/css',     //属于跨越请求
	    	'list': './list'
		},
		shim: {     //不支持AMD的js框架
			'bootstrap': {
				deps: ['jquery'],
				exports: 'bootstrap',
				init: function($){
					return $
				}
			}
		}
	});
// })




// require(['../build/app'])

