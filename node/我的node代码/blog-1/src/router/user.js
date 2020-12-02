const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const {set} = require('../db/redis')

//获取cookie的过期时间
const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    console.log(d.toGMTString('d.toGMTstring is ', d.toGMTString()))
    return d.toGMTString()
}

const handleUserRouter = (req, res) => {
    const method = req.method


    // 登陆
    if (method === 'POST' && req.path === '/api/user/login') {

        const{username,password} = req.body
        // const { username, password } = req.query
        const result = login(username, password)

        return result.then(data => {
            console.log(data.username)
            if (data.username) {

                //设置session并且修改了SESSION_DATA
                req.session.username = data.username
                req.session.realname = data.realname
                //同步到redis
                set(req.sessionId, req.session)

                return new SuccessModel('登陆成功')
            }
            return new ErrorModel('登陆失败')
        })

    }

}

module.exports = handleUserRouter