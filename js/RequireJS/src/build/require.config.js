require.config({baseUrl:"./src/js",paths:{jquery:"./lib/jquery",bootstrap:"./lib/bootstrap",text:"./lib/text",list:"./list"},shim:{bootstrap:{deps:["jquery"],exports:"bootstrap",init:function(t){return t}}}}),require(["../build/app"]);