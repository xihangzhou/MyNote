const redis = require('redis')
const { REDIS_CONF } = require('../config/db')

//创建客户端
const redisClient = redis.createClient(6379, '127.0.0.1')
redisClient.on('error', err => {
    console.error(err)
})

function set(key, val) {
    if (typeof val === 'object') {
        val = JSON.stringify(val)
    }
    redisClient.set(key, val, redis.print)
}

function get(key) {
    const promise = new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {
            if (err) {
                reject(err)
                return
            }
            if (val === null) {
                resolve(null)
                return
            }

            try {
                resolve(JSON.parse(val))//兼容JSON.parse方法
            } catch (err) {
                resolve(val)
            }
        })
    })

    return promise
}

module.exports = {
    set,
    get
}