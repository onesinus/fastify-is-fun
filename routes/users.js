async function users (fastify, opts) {
    fastify.get('/', (request, reply) => {
        fastify.conn.query('SELECT * FROM users', (err, res, fields) => {
            if (err) reply.send(err)
            return reply.send(res)
        })
    })
}

module.exports = users