const mysql = require('mysql')

const con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'zxh123456',
    port:'3306',
    database:'myblog'
})

//开始连接
con.connect()

//执行sql语句

const sql = 'select username,id from users;'

con.query(sql,(err,result) =>{
    if(err){
        console.error(err)
        return
    }
    console.log(result)
})

//关闭连接
con.end()