//var Product = require('../data/models/product.js');
var fs=require('fs');
var express = require('express');
var router = express.Router();

/*
router.get('/',function(req, res) {
    var name=req.query.name;
    var obj={};
    if(name){//update
        obj={
            title:name+'|电影|管理|moive.me',
            label:'编辑电影:'+name,
            movie:name
        };
        var callback=function(err){
            return res.render('movie', obj);
            console.log('err',err);
        };
        Product.save(obj,callback);

    } else {
        return res.render('movie',{
            title:'新增加|电影|管理|moive.me',
            label:'新增加电影',
            movie:false
        });
    }
});
*/

router.get('/',function(req,res){
    var params=req.query;

    return handleEvents.getProductList(params);
});

function init(){
    //var files=handleEvents.scanFile('../data/jsonData');
    var files=[];
    files.push('./data/jsonData/productList.json');
    var callback=function(content,file){
        productList=content.productList;
    };
    for(var i=0;i<files.length;i++){
        fs.readFile(files[i],'utf8',function(err,data){
            if(err){
               // writeLog({filename:file},'read file content error');
                console.log(err,'read file content error');
            }else{
                callback(data);
            }
        });
    }
}

var productList=[];

var handleEvents={
    getProductList:function (params){
        var start=params.page*params.size;
        return list=productList.slice(start,start+params.size+1);
    },
    scanFile:function(path){
        var fileList    = [],
            folderList  = [],
            walk = function(path, fileList, folderList){
                files = fs.readdirSync(path);
                files.forEach(function(item) {
                    var tmpPath = path + '/' + item,
                        stats = fs.statSync(tmpPath);

                    if (stats.isDirectory()) {
                        walk(tmpPath, fileList, folderList);
                        folderList.push(tmpPath);
                    } else if(reg.test(tmpPath)){

                        fileList.push(tmpPath);
                    }
                });
            };

        walk(path, fileList, folderList);

        console.log('scan ' + path +' successfully');

        return fileList;
    },
    where:function(){

    }
};

init();

module.exports=router;

