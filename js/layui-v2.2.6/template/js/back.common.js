layui.use(['jquery', 'element', 'layer', 'table', 'form', 'upload', 'layedit'], function($, element, layer, table, form, upload, layedit) {
    element.on('nav(aside)', function(data) {
        var url = data.attr('url');
        var text = data.text();
        console.log(text);
    });

    window.layeropen = function(obj){
        var totalAlert = !obj.isSub ? $('.totalAlert') : $('.subTotalAlert'),
            openTitle = obj.title || '信息', 
            openWidth = obj.width || 600, 
            openHeight = obj.height || 400; 
        totalAlert.html($(obj.domhtml).html() || '内容有误');
        layer.open({
            type: 1,
            area: [openWidth+'px', openHeight+'px'], //整个弹框的 宽高
            title: openTitle,
            content: totalAlert,
            shade: 0.75, 
            anim: 2 || Math.ceil(Math.random() * 5),
            resize: false,
            move: false,
            // shadeClose: true,
            success: function(layero, index) {
                console.log(layero,index)
                if (typeof obj.success == 'function') obj.success(layero, index);
            },
            end: function() {
                totalAlert = openTitle = openWidth = openHeight = null;
                if (typeof obj.end == 'function') obj.end();
            },
            cancel: function(layero) {
                if (typeof obj.cancel == 'function') obj.cancel(layero);
            }
        });
        form.render();
    };



    //ajax方法
    window.ajax = function(url, data, success, async, obj) {
        var method  = obj && typeof obj.type  != 'undefined' ? obj.type : 'post';
        var cache   = obj && typeof obj.cache != 'undefined' ? obj.cache : true;
        var async   = typeof async != 'undefined' ? async : true;
        $.ajax({
            method: method,
            url: url,
            data: JSON.stringify(data),
            contentType: "application/json",
            cache: false,
            async: async,
            success: function(res) {
                method = cache = async = null;
                if (typeof success == 'function') success(res);
            }
        });
    };



    //时间格式
    window.formatTime = function(time){
        var now    = new Date(time);
        var year   = now.getFullYear();
        var month  = ("0" + (now.getMonth() + 1)).match(/\d{2}$/)[0];
        var date   = ("0" + now.getDate()).match(/\d{2}$/)[0];
        var hour   = ("0" + now.getHours()).match(/\d{2}$/)[0];
        var minute = ("0" + now.getMinutes()).match(/\d{2}$/)[0];
        var second = ("0" + now.getSeconds()).match(/\d{2}$/)[0];
        var str = year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second;
        now = year = month = date = hour = minute = second = null;
        return str;
    };
});