const fastifyPlugin = require('fastify-plugin')

function MysqlConnector (fastify, options, done) {
    const  mysql = require('mysql')
    const connection = mysql.createConnection({
        host: 'db4free.net',
        user: 'fastify',
        password: 'fastifyisfun',
        database: 'fastify_restful'
    })

    connection.connect((err) => {
        if (err) {
            fastify.log.error('Error connecting to database')
            done()
        }
    })

    fastify.decorate('conn', connection)
    done()

    fastify.addHook('onClose', (instance, done) => {
        connection.destroy()
        done()
    })
}

module.exports = fastifyPlugin(MysqlConnector)
