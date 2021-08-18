const log = require('pino')({ level: 'info' })

const fastify = require('fastify')({ 
  logger: log
})

const { mysql } = require('./plugins')
const { users, auth } = require('./routes')
const { usersSchema, authSchema  } = require('./schemas')
const bcrypt = require('fastify-bcrypt')

fastify.register(mysql)
fastify.register(bcrypt, { saltWorkFactor: 11 })

fastify.get('/', function (request, reply) {
  reply.send({ hello: 'world' })
})
fastify.register(users, { prefix: '/users', schema: usersSchema })
fastify.register(auth, { prefix: '/auth', schema: authSchema })

const start = () => {
  try {
    fastify.listen(process.env.PORT || 3000)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

module.exports = start
