const { exec } = require('../db/mysql')


const getList = (author, keyword) => {

    //这个地方后面必须要有一个空格 
    let sql = `select * from blogs where 1=1 `//如果没有1=1后面都没有值就会报错
    if(author){
        sql += `and author='${author}' `
    }
    if(keyword){
        sql +=   `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc;`

    console.log(sql);

    //返回一个promise
    return exec(sql)
}

const getDetail = (id) => {
    const sql = `select * from blogs where id='${id}'`
    return exec(sql).then(rows=>{
        return rows[0]//虽然只有一个结果，但是是以数组的形式返回的。所以要取第一个
    })
}

const newBlog = (blogData = {}) => {

    //blogData是一个博客对象
    const {title,content,author} = blogData
    const createtime = Date.now()

    const sql =   `
    insert into blogs (title,content,createtime,author)
    values ('${title}','${content}',${createtime},'${author}')
    `
    return exec(sql).then(insertData=>{
        // console.log(insertData)
        return {
            id:insertData.insertId
        }
    })
}

const updateBlog = (id, blogData = {}) => {
    //id是要更新博客的id
    // blogData是一个博客对象
    const {title,content} = blogData;

    const sql =  `
    update blogs set title = '${title}',content='${content}' where id='${id}'
    `

    return exec(sql).then(updateData=>{
        if(updateData.affectedRows > 0){
            return true
        }
        return false
    })
}

const delBlog = (id,author) => {
    //id
    const sql = `
    delete from blogs where id='${id}' and author='${author}' 
    `
    return exec(sql).then(delData=>{
        if(delData.affectedRows > 0){
            return true
        }
        return false
    })
}
module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}