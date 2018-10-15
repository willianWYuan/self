var headtag = document.getElementsByTagName('head')[0];
var bodytag = document.getElementsByTagName('body')[0];



// add header-meta
(()=>{
    var str = `
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="black">
        <meta name="format-detection" content="telephone=no,email=no">
    `;
    headtag.innerHTML = str + headtag.innerHTML;
    str = null;
})();




// add footer
(()=>{
    var str = `
        <div class="footer">
            <a class="sy"><i class="iconfont">&#xe62d;</i>首页</a>
            <a class="fw"><i class="iconfont">&#xe62e;</i>服务</a>
            <a class="cp"><i class="iconfont">&#xe62c;</i>产品</a>
            <a class="wd"><i class="iconfont">&#xe62b;</i>我的</a>
        </div>
    `;
    bodytag.innerHTML = bodytag.innerHTML + str;
    str = null;
})();








headtag = bodytag = null;
    