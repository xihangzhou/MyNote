const { getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

//统一登陆验证函数
const loginCheck = (req) => {
    if (!req.session.username) {
        return Promise.resolve(
            new ErrorModel('尚未登陆')
        )
    }
}

const handleBlogRouter = (req, res) => {

    const method = req.method
    const id = req.query.id

    //博客列表
    if (method === 'GET' && req.path === '/api/blog/list') {
        let author = req.query.author || ''
        const keyword = req.query.keyword || ''

        if(req.query.isadmin){
            //管理员界面
            const loginCheckResult = loginCheck(req)
            //若没有登陆
            if(loginCheckResult){
                return loginCheckResult
            } 
            //若登陆了强制把session中的username赋值
            author = req.session.username
        }

        const result = getList(author, keyword)

        return result.then(listData => {
            return new SuccessModel(listData)
        })
    }


    //博客详情
    if (method === 'GET' && req.path === '/api/blog/detail') {

        const result = getDetail(id)
        return result.then(data => {
            return new SuccessModel(data)
        })

    }

    //新建博客
    if (method === 'POST' && req.path === '/api/blog/new') {

        const loginCheckResult = loginCheck(req)
        if (loginCheckResult) {
            //未登录
            return loginCheckResult
        }

        req.body.author = req.session.username//假数据，待真实开发时再修改
        const result = newBlog(req.body)
        return result.then(data => {
            return new SuccessModel(data)
        })
    }

    //更新博客
    if (method === 'POST' && req.path === '/api/blog/update') {

        const loginCheckResult = loginCheck(req)
        if (loginCheckResult) {
            //未登录
            return loginCheckResult
        }

        const result = updateBlog(id, req.body)
        return result.then(val => {
            if (val) {
                return new SuccessModel()
            } else {
                return new ErrorModel('更新失败')
            }
        })
    }

    //删除博客
    if (method === 'POST' && req.path === '/api/blog/del') {

        const loginCheckResult = loginCheck(req)
        if (loginCheckResult) {
            //未登录
            return loginCheckResult
        }

        const author = req.session.username//假数据，待真实开发时再修改
        const result = delBlog(id, author)
        return result.then(val => {
            if (val) {
                return new SuccessModel()
            } else {
                return new ErrorModel('删除博客失败')
            }
        })
    }
}

module.exports = handleBlogRouter