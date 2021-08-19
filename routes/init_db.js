async function init_db (fastify, opts) {
    fastify.get('/', (request, reply) => {
        fastify.log.info("Creating tables.......")
        fastify.conn.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
                username VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
                password VARCHAR(256) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
                PRIMARY KEY (id) USING BTREE,
                UNIQUE INDEX username (username) USING BTREE
            );
        `, (err, res, fields) => {
            if (err) reply.send(err)
            reply.send(res)
        })
    })
}

module.exports = init_db