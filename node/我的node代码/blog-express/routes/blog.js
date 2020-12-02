var express = require('express');
var router = express.Router();
var router = express.Router();
const {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')

/* GET home page. */
router.get('/list', function(req, res, next) {
    let author = req.query.author || ''
    const keyword = req.query.keyword || ''

    // if(req.query.isadmin){
    //     //管理员界面
    //     const loginCheckResult = loginCheck(req)
    //     //若没有登陆
    //     if(loginCheckResult){
    //         return loginCheckResult
    //     } 
    //     //若登陆了强制把session中的username赋值
    //     author = req.session.username
    // }

    const result = getList(author, keyword)

    return result.then(listData => {
        res.json(new SuccessModel(listData)) 
    })
});

router.get('/detail', function(req, res, next) {
    res.json({
        errno:0,
        data:'OK'
    })//先把json变成字符串返回，再加上content-type头
});

module.exports = router;
