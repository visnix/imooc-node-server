const env = process.env.NODE_ENV  // 环境参数

// 配置
let MYSQL_CONF = {
    host: '127.0.0.1',
    user: 'root',
    password: '123456qwe!',
    port: '3306',
    database: 'myblog'
}
let REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
}

if (env === 'dev') {
    // mysql
    MYSQL_CONF = {
        host: '127.0.0.1',
        user: 'root',
        password: '123456qwe!',
        port: '3306',
        database: 'myblog'
    }

    // redis
    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }
}

if (env === 'production') {
    // mysql
    MYSQL_CONF = {
        host: '127.0.0.1',
        user: 'root',
        password: '123456qwe!',
        port: '3306',
        database: 'myblog'
    }

    // redis
    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }
}

module.exports = {
    MYSQL_CONF,
    REDIS_CONF
}