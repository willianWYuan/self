(function(w) {
    "use strict";

    w.Router = {};
    Router.Params = {};
    Router.currfile = {};  //记录当前文件elem url
    Router.route = function(path) {
        Router.currfile = {};
        $.each(Router.url, function(i, item) {

            var itempath = item.path.split('/:');
            var currpath = path.slice(1).split(/\//);
            if (itempath[0]   == '/' + currpath[0] || 
                item.rootpath == '/' + currpath[0]) {

                Router.currfile.Url  = item.url;
                Router.currfile.elem = item.elem;


                //设置 地址栏参数
                Router.Params = {};  
                $.each(itempath, function(j, el){
                    if (j == 0) return true;
                    var elval = !currpath[j] ? null : currpath[j];
                    Router.Params[el] = elval;
                })

                //更换 并切换路由
                $(item.elem).attr('router-html-src', item.url);
                Router.updateRouter($(Router.currfile.elem));

                return false;
            } else {
                Router.currfile.elem = item.elem;
            }
        });
        //指向error.html
        if (!Router.currfile.Url) {
            $(Router.currfile.elem).attr('router-html-src', 'error.html');
            Router.currfile.Url = 'error.html';
            Router.updateRouter($(Router.currfile.elem));
            console.error('GET ' + location.href + ' 404 (Not Found)');
        }
    }


    Router.refresh = function() {
        var currpath = location.hash.slice(1) || '/';
        Router.route(currpath);
    }
    
    Router.getAjax = function(obj) {
        obj.type = obj.type != void 0 ? obj.type : 'get';
        obj.async = obj.async != void 0 ? obj.async : true;
        obj.cache = obj.cache != void 0 ? obj.cache : false;
        $.ajax({
            method: obj.type,
            url: obj.url,
            cache: obj.cache,
            async: obj.async,
            success: function(res) {
                if (typeof obj.success == 'function') obj.success(res);
            }
        })
    };
    Router.updateRouter = function(arr) {
        $.each(arr, function(i, item) {
            Router.getAjax({
                url: $(item).attr('router-html-src'),
                success: function(res) {
                    $(item).html(res);
                }
            })
        });
    }


    $(window).on('hashchange', function(){ Router.refresh(); });
    $(function(){  
        Router.refresh();   //页面加载  触发路由

        // include-file      触发include 和 上面router 不一样
        $.each($('[include-html-src]'), function(i, item) {
            Router.getAjax({
                url: $(item).attr('include-html-src'),
                success: function(res) {
                    $(item).html(res)
                }
            })
        });
    });
})(this);