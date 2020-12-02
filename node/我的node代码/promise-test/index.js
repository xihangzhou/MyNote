const fs = require('fs')//文件操作原声模块
const path = require('path')//文件路径原生模块


// //callback方式获取一个文件的内容
// function getFileContent(fileName, callback) {
//     //拼接绝对路径
//     const fullFileName = path.resolve(__dirname, 'files', fileName)//dir当前文件目录

//     //readFile异步操作,后面这个函数为回调函数
//     fs.readFile(fullFileName, (err, data) => {
//         if (err) {
//             console.error(err)
//             return
//         }
//         callback(
//             JSON.parse(data.toString())
//         )
//     })

// }

// // 测试 callback-hell
// getFileContent('a.json', aData => {
//     console.log('a data', aData)
//     getFileContent(aData.next, bData => {
//         console.log('b data', bData)
//         getFileContent(bData.next, cData => {
//             console.log('c data', cData)
//         })
//     })
// })

function getFileContent(fileName) {
    const promise = new Promise((resolve, reject) => {
        //拼接绝对路径
        const fullFileName = path.resolve(__dirname, 'files', fileName)//dir当前文件目录

        //readFile异步操作,后面这个函数为回调函数
        fs.readFile(fullFileName, (err, data) => {
            if (err) {
                console.error(err)
                reject(err)
            }
            resolve(
                JSON.parse(data.toString())
            )
        })
    })
    return promise
}

getFileContent('a.json').then(aData => {
    console.log('a Data',aData)
    return getFileContent(aData.next)
}).then(bData => {
    console.log('b Data',bData)
    return getFileContent(bData.next)
}).then(cData =>{
    console.log('c Data',cData)
})