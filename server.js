const log = require('pino')({ level: 'info' })

const fastify = require('fastify')({ 
  logger: log
})

const { mysql } = require('./plugins')
const { users, auth, init_db } = require('./routes')
const { usersSchema, authSchema  } = require('./schemas')
const bcrypt = require('fastify-bcrypt')

fastify.register(mysql)
fastify.register(bcrypt, { saltWorkFactor: 11 })

fastify.get('/', function (request, reply) {
  reply.send({ hello: 'world' })
})
fastify.register(init_db, { prefix: '/init-db' })
fastify.register(users, { prefix: '/users', schema: usersSchema })
fastify.register(auth, { prefix: '/auth', schema: authSchema })

const start = () => {
  try {
    const PORT = process.env.PORT || 3000
    fastify.listen(PORT)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
