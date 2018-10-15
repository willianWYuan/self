let deepcopy = function(obj){
    var foreachobj = function(oldval, newval) {
        for (var x in oldval){
            if (!oldval.hasOwnProperty(x)) continue;
            if (typeof oldval[x] == 'object') {
                newval[x] = oldval[x] instanceof Array ? [] : {};
                foreachobj(oldval[x], newval[x]);
            } else {
                newval[x] = oldval[x];
            }
        }
    }
    var newobj = obj instanceof Array ? [] : {};
    foreachobj(obj, newobj);
    return newobj;
}


let each = function (obj, cb) {
    for (var x in obj) {
        if (!obj.hasOwnProperty(x)) return;
        if (typeof cb == 'function') cb(obj[x], x);
    }
}

let importfile = function(arr, cb){
    if (typeof arr != 'array') return;
    for (var i = 0; i < arr.length; i++) {
        var obj;
        if (arr[i].search(/css/g) != -1) obj = {
            name: 'link',
            rel: 'stylesheet',
            type: 'text/css',
            method: 'href'
        };
        if (arr[i].search(/js/g) != -1) obj = {
            name: 'script',
            type: 'text/javascript',
            method: 'src'
        };

        var tag = document.createElement(obj.name);
        tag.setAttribute(obj.method, arr[i]);
        if (arr[i].search(/css/g) != -1) tag.setAttribute('rel', obj.rel);
        tag.setAttribute('type', obj.type);
        document.getElementsByTagName('body')[0].appendChild(tag);
        if (typeof cb == 'function') cb();
    };
}


let cuturl = function(){
    var href = location.href.split('?')[1].split(/&+/g);
    var newObj = {};
    for (var i = 0; i < href.length; i++) {
        newObj[href[i].split('=')[0]] = href[i].split('=')[1]
    }
    return newObj;
}