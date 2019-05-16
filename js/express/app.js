var express = require('express');
var app = express();

app.set('view engine','ejs');

app.get('/about',function (req,res) {
    res.render('about', {title: 'about'});
});

app.get('/profile/:id?',function (req,res) {
    // 设置模板引擎后，返回对应的ejs文件需要使用render方法
    var data = [{name:"亨锅锅",age:28},{name:"亨锅锅2",age:19}];
    res.render('profile',{title: 'profile', websiteName:"EJS", data});
})

app.listen(80);