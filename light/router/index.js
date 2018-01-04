var light=require("ueklight");
var router=light.Router();
var mysql = require("mysql");
var md5 = require("./md5")
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'demo'
});
connection.connect();
router.get("/",function(req,res){
    res.render("index.html",{name:"light"});
})


router.get("/fetch",function(req,res){
    setTimeout(function(){

        connection.query("select * from students",function(err,result){
            if(err){
                res.end('err')
            }else{
                res.send(JSON.stringify(result))
            }
        })

    },2000)

})

router.get("/add",function(req,res){
     var name = req.query.name;
     var age = req.query.age;
     var sex = req.query.sex;
     connection.query(`insert into students (name,age,sex) values ('${name}','${age}','${sex}')`,function(err,result){
         if(err){
             res.end('err')
         }else{
             res.send('ok')
         }
     })
})

router.get("/del/:id",function(req,res){
    var id=req.params.id;

    connection.query("delete from students where id="+id,function(err,result){
        if(err){
            res.end("err");
        }else{
            res.end("ok")
        }
    })
})

router.get("/updateCon",function(req,res){
    var id=req.query.id;
    var name = req.query.name;
    var age = req.query.age;
    var sex = req.query.sex;
console.log(id)
    connection.query(`update students set name='${name}',age='${age}',sex='${sex}' where id='${id}'`,function(err,result){
        if(err){
            res.end("err");
        }else{
            res.end("ok")
        }
    })
})

router.get("/update/:id",function(req,res){
    var id = req.params.id;
    connection.query(`select * from students where id='${id}'`,function(err,result){
        if(err){
            res.end('err')
        }else{
            res.send(JSON.stringify(result))
        }
    })
})

router.get("/check",function (req,res) {
    var name = req.query.name;
    var pass = md5(req.query.pass);
    console.log(name)
    connection.query(`select * from user where uname='${name}' and upass='${pass}'`,function(err,result){
        console.log(result)
        if(err){
            console.log(1)
            var obj = {code:'',state:'err'}
            res.send('err')
        }else{

            if(result.length>0){
                console.log(2)
                var obj = {code:md5(name),state:'ok'}
                res.send(JSON.stringify(obj))
            }else{
                console.log(3)
                var obj = {code:'',state:'err'}
                res.send('err')
            }
        }
    })
})

router.get("/check1",function (req,res) {
    var name = req.query.name;
    connection.query(`select * from user where uname='${name}'`,function(err,result){
        if(err){
            res.end('err')
        }else{
            if(result.length>0){
                res.send('err')
            }else{
                res.send('ok')
            }
        }
    })
})

router.post("/adduser",function(req,res){
    var name = (req.body.name)
    var pass = md5(req.body.pass)
    connection.query(`insert into user (uname,upass) values ('${name}','${pass}')`,function(err,result){
        if(err){
            res.end('err')
        }else{
            console.log(result.affectedRows)
            if(result.affectedRows>0){
                res.end('ok')
            }else{
                res.end('err')
            }
        }
    })
})


