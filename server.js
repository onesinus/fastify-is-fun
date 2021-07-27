const fastify = require('fastify')({ logger: true })

const pluginPertama = require('./plugin-pertama')
const endpointPertama = require('./endpoint-pertama')

fastify.register(endpointPertama)
fastify.register(pluginPertama)

const start = async () => {
  try {
    await fastify.listen(3000)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()