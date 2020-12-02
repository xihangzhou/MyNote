const fs = require('fs')
const path = require('path')//因为不同系统中的路径写法不同，所以用一个自定义的方法自己调和

//拼接路径
const fileName = path.resolve(__dirname,'data.txt')//__dirname是当前目录，是node中的全局变量

//读取文件
fs.readFile(fileName,(err,data)=>{
    if(err){
        console.error(err)
        return
    }
    //data是二进制，需要转换为字符串
    console.log(data.toString());
})