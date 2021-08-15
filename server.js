const log = require('pino')({ level: 'info' })

const fastify = require('fastify')({ 
  logger: log
})

const { mysql } = require('./plugins')
const { users } = require('./routes')
const { usersSchema  } = require('./schemas')
const bcrypt = require('fastify-bcrypt')

fastify.register(mysql)
fastify.register(bcrypt, { saltWorkFactor: 11 })
fastify.register(users, { prefix: '/users', schema: usersSchema })

const start = async () => {
  try {
    await fastify.listen(3000)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
