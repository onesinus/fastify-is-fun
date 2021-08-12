const log = require('pino')({ level: 'info' })

const fastify = require('fastify')({ 
  logger: log
})

const { mysql } = require('./plugins')
const { users } = require('./routes')

fastify.register(mysql)
fastify.register(users, { prefix: '/users' })

const start = async () => {
  try {
    await fastify.listen(3000)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()