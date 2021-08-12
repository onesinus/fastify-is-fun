async function users (fastify, opts) {
    fastify.get('/', (request, reply) => {
        fastify.conn.query('SELECT * FROM users', (err, res, fields) => {
            if (err) reply.send(err)
            reply.send(res)
        })
    })

    fastify.post('/', opts["schema"], (request, reply) => {
        const { username, password } = request.body
        
        const data = { username, password }
        fastify.conn.query('INSERT INTO users SET ?',data, (err, res, fields) => {
            if (err) reply.send(err)
            reply.send(data)
        })
    })
}

module.exports = users