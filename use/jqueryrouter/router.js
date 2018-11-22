class createRouter {
    constructor({
        routes
    }) {
        this.routes = routes
        this.history = [];
    }

    log() {
        console.log(`%c${this.page}:`, `color:#aaa`, ...Array.from(arguments))
    }


    refresh() {
        let [href, currRouter] = [location.href.split('#')[1], null];
        if (!href || href == '/') {
            location.href = `#${this.routes[0].path}`;
        } else {
            this.data = {};
            this.params = {};
            this.routes.map((item, itemIndex) => {
                if (((isItemPathList, isHrefList) => {
                        let isflog;
                        if (isItemPathList.length == isHrefList.length) { // item.path和href  切割数量一样时
                            isflog = true;
                            isItemPathList.map((elem, elemIndex) => {
                                if (elem.match(':')) this.params[elem.replace(':', '')] = isHrefList[elemIndex]; // 参数 不需要作对比  并记录参数值
                                else if (elem != isHrefList[elemIndex]) isflog = false; // 只要有一个元素对不上  就不符合
                            })
                        } else {
                            isflog = false;
                        }
                        return isflog;
                    })(item.path.split('/'), href.split('/'))) this.page = currRouter = item.url + '.html';
            });
            this.include('.router-view', currRouter)
        }
    }


    include(elem, file) {
        const _self = this;
        $.ajax({
            method: 'get',
            url: file,
            cache: false,
            success(res) {
                if (!file) console.log('对应的url不存在/path没对应');
                $(elem).html(file ? res : '')
                $('body').off('click').on('click', '[to]', function() {
                    let to = $(this).attr('to');
                    to.match(/\|/) ? _self.include(...to.split('|')) : location.href = '#' + to;
                })  
            },
            error(err) {
                console.error('获取文件失败')
            }
        });
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
    }]
})
$(document).ready(() => router.refresh());
$(window).on('hashchange', () => router.refresh.call(router));