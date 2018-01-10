var express = require('express');
var mysql      = require('mysql');
var router = express.Router();

var fs=require('fs');   //重新命名
var formidable=require('formidable');   //写入文件

var connection = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : '123456'
});
var temp=''
/* GET home page. */
router.post('/con', function(req, res, next) {
    res.header('Access-Control-Allow-Origin','*');
    connection.query(`INSERT INTO item.our (img) VALUES ('${temp}')`, function(err, rows, fields) { 
        res.send(rows)
    });
});
//后台管理
router.post('/tr', function(req, res, next) {
    res.header('Access-Control-Allow-Origin','*');
    connection.query('SELECT * FROM item.our ', function(err, rows, fields) { 
        res.send(rows)
    });
});
//delete
router.post('/delete', function(req, res, next) {
    res.header('Access-Control-Allow-Origin','*');
    var id=req.body.id;
    connection.query('DELETE FROM item.our WHERE id='+id, function(err, rows, fields) { 
        res.send(rows)
    });
});
//修改接口
router.post('/gai', function(req, res, next) {
    res.header('Access-Control-Allow-Origin','*');
    var id=req.body.gai;
    connection.query('SELECT * FROM item.our WHERE id='+id, function(err, rows, fields) { 
        res.send(rows)
    });
});
//确认修改
router.post('/qrgai', function(req, res, next) {
    res.header('Access-Control-Allow-Origin','*');
    var name=req.body.name;
    var zhiwei=req.body.zhiwei;
    var id=req.body.id;
    connection.query("UPDATE item.our SET img='"+temp+"',name='"+name+"',zhiwei='"+zhiwei+"' WHERE id="+id , function(err, rows, fields) { 
        res.send(rows)
    }); 
});
//模板功能 HTML页面接口
router.get('/list', function(req, res, next) {
    res.header('Access-Control-Allow-Origin','*');
    connection.query('SELECT * FROM item.our', function(err, rows, fields) { 
        res.send(rows)
    });
});
//img
router.post('/img',function(req,res){
    res.header('Access-Control-Allow-Origin','*');
    var form = new formidable.IncomingForm();
    form.uploadDir = 'public/upload'  //图片的存放路径
    form.parse(req,function(err,fields,files){
        console.log(fields,files);
        for(i in files){
            var file = files[i];
            var fName = (new Date()).getTime();
            switch(file.type){
                case 'image/jpeg':
                fName = fName+'.jpg';
                break;
                case 'image/png':
                fName = fName + '.png';
                break;
                case 'image/gif':
                fName = fName + '.gif';
                break;
            }
            var newPath = 'public/upload/' + fName
            fs.renameSync(file.path,newPath);
            res.send(newPath)
            temp=fName
        }
        //  connection.query(`INSERT INTO item.our (img) VALUES ('http://localhost:3000/upload/${fName}')`,function(err,rows){
        // if(err) throw err;
        // if(rows){
        //     connection.query('SELECT img FROM item.our',function(err,rows){
        //         // res.send(rows);
        //     })
        // }
    })

    })




module.exports = router;
