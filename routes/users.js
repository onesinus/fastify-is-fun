async function users (fastify, opts) {
    fastify.get('/', (request, reply) => {
        fastify.conn.query('SELECT * FROM users', (err, res, fields) => {
            if (err) reply.send(err)
            reply.send(res)
        })
    })

    fastify.get('/:id', (request, reply) => {
        const id = request.params["id"] ? request.params["id"] : 0
        fastify.conn.query('SELECT * FROM users WHERE id=?', id, (err, res, fields) => {
            if (err) reply.send(err)
            reply.send(res[0])
        })
    })

    fastify.post('/', opts["schema"], (request, reply) => {
        const { username, password } = request.body
        
        const data = { username, password }
        fastify.conn.query('INSERT INTO users SET ?', data, (err, res, fields) => {
            if (err) reply.send(err)
            reply.send(data)
        })
    })

    fastify.put('/:id', opts["schema"], (request, reply) => {
        const { username, password } = request.body
        const id = request.params["id"] ? request.params["id"] : 0
        if (id > 0) {
            const data = [
                username,
                password,
                parseInt(id)
            ]
            fastify.conn.query('UPDATE users SET username=?, password=? WHERE id=?', data, (err, res, fields) => {
                if (err) reply.send(err)
                reply.send(`Data with id #${id} has been updated`)
            })
        } else {
            reply.code(404).send('No ID Given')
        }
    })

    fastify.delete('/:id', (request, reply) => {
        const id = request.params["id"] ? request.params["id"] : 0
        if (id > 0) {
            fastify.conn.query('DELETE FROM users WHERE id=?', id, (err, res, fields) => {
                if (err) reply.send(err)
                reply.send(`Data with id #${id} has been deleted`)
            })
        } else {
            reply.code(404).send('No ID Given')
        }
    })
}

module.exports = users