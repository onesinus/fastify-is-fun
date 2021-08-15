async function auth (fastify, opts) {
    fastify.post('/', opts["schema"], (request, reply) => {
        const { username, password } = request.body
        
        fastify.conn.query('SELECT * FROM users WHERE username=?', username, async (err, res, fields) => {
            if (err) reply.send(err)
            if (res[0] && res[0]["password"]) {
                const valid = await fastify.bcrypt.compare(password, res[0]["password"])
                if (valid) {
                    reply.send({
                        token: 'Disini kita bisa mengembalikan token, yang berisi data user yang valid'
                    })
                }
            }
            reply.code(401).send({ message: 'Invalid username or password' })
        })
    })
}

module.exports = auth