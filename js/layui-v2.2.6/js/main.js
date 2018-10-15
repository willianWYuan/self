layui.define('jquery', function(exports){
    var fn = function () {
        this.text = 'welcome to layui';
    };
    fn.prototype.say = function () {
        console.log(this.text);
    };

    exports('main', fn);
}); 