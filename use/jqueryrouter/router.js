class createRouter {
    constructor({
        routes
    }) {
        this.routes = routes
    }

    params(argumentStr) {
        let href = location.href.split('?')[1];
        if (!href) return;
        href = href.split(/&+/g);
        let newObj = {};
        for (let i = 0; i < href.length; i++) {
            newObj[href[i].split('=')[0]] = href[i].split('=')[1]
        }
        return typeof argumentStr == 'undefined' ? newObj : newObj[argumentStr];
    }


    log() {
        console.log(`%c${this.page}:`, `color:#aaa`, Array.from(arguments).join(' '))
    }


    refresh() {
        let [href, _self, currRouter, subRouterIndex] = [location.href.split('#')[1], this, null, 0];

        // 重置参数
        _self.done = null;
        _self.params = {};


        if (!href || href == '/') {
            location.href = `#${this.routes[0].path}`;
        } else {
            // function isHasSubRouter(objective, nums) {   //判断是否有 子路由  返回有多少层子路由
            //     if (objective.children) isHasSubRouter()
            // }

            _self.routes.map((item, itemIndex) => {
                if (((isItemPath, isHref) => {
                        let isflog;
                        if (isItemPath.length == isHref.length) { // item.path和href  切割数量一样时
                            isflog = true;
                            isItemPath.map((elem, elemIndex) => {
                                if (elem.match(':')) this.params[elem.replace(':', '')] = isHref[elemIndex]; // 参数 不需要作对比  并记录参数值
                                else if (elem != isHref[elemIndex]) isflog = false; // 只要有一个元素对不上  就不符合
                            })
                        } else {
                            isflog = false;
                        }
                        return isflog;
                    })(item.path.split('/'), href.split('/'))) _self.page = currRouter = item.url + '.html';
            });
            console.log(currRouter)



            $.ajax({
                method: 'get',
                url: currRouter,
                cache: false,
                success(res) {
                    if (!currRouter) console.log('对应的url不存在/path没对应');

                    $($('.router-view')[subRouterIndex]).html(currRouter ? res : '');
                    try {
                        _self.done()
                    } catch (err) {
                        // console.log(err);
                    }
                },
                error(err) {
                    console.error('获取文件失败')
                }
            });
        }
    }
}


window.router = new createRouter({
    routes: [{
        path: '/a',
        url: '/inner/a'
    }, {
        path: '/b/:userId/:keys',
        url: '/inner/b'
    }, {
        path: '/bag',
        url: '/inner/bag'
    }, {
        path: '/c',
        url: '/inner/c',
        children: [{
            path: '/c1',
            url: '/inner/c1',
        }, {
            path: '/c2',
            url: '/inner/c2',
        }]
    }]
})
$(document).ready(() => router.refresh());
$(window).on('hashchange', () => router.refresh.call(router));